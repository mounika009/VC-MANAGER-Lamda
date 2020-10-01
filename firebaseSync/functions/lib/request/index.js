"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
class Request {
    constructor(configuration) {
        this.configuration = configuration;
    }
    makeRequest(routeObject, data) {
        return new Promise((resolve, reject) => {
            let options = this.createRequestOptions(routeObject);
            console.log('info', `HTTP Request options is `, options);
            let request;
            request = https.request(options, response => this.responseHandler(response, resolve, reject));
            request.on('connect', () => {
                console.log('info', 'Connected to API');
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
    createRequestOptions(routeObject) {
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
    responseHandler(response, resolve, reject) {
        let report = '';
        response.setEncoding('utf8');
        response.on('data', function (data) {
            report += data;
        });
        response.on('end', function () {
            resolve({ error: false, statusCode: 200, message: 'Success', report: report });
        });
    }
}
exports.default = Request;
//# sourceMappingURL=index.js.map