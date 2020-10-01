export default interface IRequest{
    makeRequest(routeObject, data: any): Promise<any>
}