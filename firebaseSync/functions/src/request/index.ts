import * as https from "https";
import IRequest from "../contracts/request";

export default class Request implements IRequest{

    constructor(private configuration: IRequestConfiguration) {
    }

    public makeRequest(routeObject, data: any): Promise<any> {

        return new Promise( (resolve, reject) => {
            let options: any = this.createRequestOptions(routeObject);

            console.log('info', `HTTP Request options is `, options);

            let request;

            request = https.request(options, response => this.responseHandler(response, resolve, reject));

            request.on('connect', () => {
                console.log('info', 'Connected to API')
            });

            request.on('error', e => {
                console.log('error', 'An error occurred while connecting to API!', e);
                throw new Error('An error occurred while connecting to API');
            });

            console.log('info', `Data to send to the API is`, data);

            request.write(data);
            request.end();
        });
    }

    private createRequestOptions(routeObject: any) {
        console.log({
            host: this.configuration.host,
            port: this.configuration.port,
            path: routeObject.path,
            method: routeObject.method,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.configuration.accessToken,
                'x-account-key': this.configuration.accountKey,
                'x-referrer': routeObject.owner || this.configuration.owner.toLowerCase(),
                'Connection': 'keep-alive',
                'x-application': 'GCF',
                'x-user': 0
            }
        });
        return {
            host: this.configuration.host,
            port: this.configuration.port,
            path: routeObject.path,
            method: routeObject.method,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.configuration.accessToken,
                'x-account-key': this.configuration.accountKey,
                'x-referrer': routeObject.owner || this.configuration.owner.toLowerCase(),
                'Connection': 'keep-alive',
                'x-application': 'GCF',
                'x-user': 0
            }
        };


    }

    private responseHandler(response: any, resolve: any, reject: any) {
        let report = '';

        response.setEncoding('utf8');

        response.on('data', function (data: any) {
            report += data;
        });

        response.on('end', function () {
            resolve({error: false, statusCode: 200, message: 'Success', report: report});
        });
    }
}

interface IRequestConfiguration {
    owner: String,
    host: String,
    port: Number,
    accessToken: String,
    accountKey: String,
}