import IRoutes from "./contracts/routes";
import CRUDFunction from "./CRUD-function";
import Request from "./request";

const request = new Request({
    owner: 'dev',
    host: "dev.irestore.info",
    port: 443,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey: 'general',
}) //TODO: Move to a config file

//For Jobs

const jobsCRUDFunctions = new CRUDFunction(
    'irestore-vcmanager-dev', <IRoutes>{
        'POST': '/dev/api/vcm/jobs/',
        'PUT': '/dev/api/vcm/jobs/',
        'DELETE': '/dev/api/vcm/jobs/',
    }, request);


export const jobCreate = jobsCRUDFunctions.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
export const jobUpdate = jobsCRUDFunctions.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');

