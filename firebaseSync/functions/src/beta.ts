import IRoutes from "./contracts/routes";
import CRUDFunction from "./CRUD-function";
import Request from "./request";
import {determineInsEventType} from "./utils";


const requestBETA = new Request({
    owner       : 'liberty',
    host        : 'api-beta.irestore.info',
    port        : 443,
    accessToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey  : 'general',
}) ;//TODO: Move to a config file

const jobsCRUDFunctionsBETA = new CRUDFunction(
    'irestore-qa-manager-beta', <IRoutes>{
        'POST': '/v1/qaManager/',
        'PUT': '/v1/qaManager/',
        'DELETE': '/v1/qaManager/',
    }, requestBETA);


export const jobCreateBETA = jobsCRUDFunctionsBETA.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
export const jobUpdateBETA = jobsCRUDFunctionsBETA.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
export const jobDeleteBETA = jobsCRUDFunctionsBETA.setEventType("DELETE_JOB").onDelete('/{tenant}/jobs/{jobId}', '');

const deficienciesCRUDFunctionsBETA = new CRUDFunction(
    'irestore-qa-manager-beta', <IRoutes>{
        'POST': '/v1/qaManager/deficiencies/',
        'PUT': '/v1/qaManager/deficiencies/',
        'DELETE': '/v1/qaManager/deficiencies/',
    }, requestBETA);


export const deficiencyCreateBETA = deficienciesCRUDFunctionsBETA.setEventType("CREATE_DEFICIENCY").onCreate('/{tenant}/deficiencies/{deficiencyId}', '');
export const deficiencyUpdateBETA = deficienciesCRUDFunctionsBETA.setEventType("UPDATE_DEFICIENCY").onUpdate('/{tenant}/deficiencies/{deficiencyId}', '');
export const deficiencyDeleteBETA = deficienciesCRUDFunctionsBETA.setEventType("DELETE_DEFICIENCY").onDelete('/{tenant}/deficiencies/{deficiencyId}', '');


const inspectionsCRUDFunctionsBETA = new CRUDFunction(
    'irestore-qa-manager-beta', <IRoutes>{
        'POST': '/v1/qaManager/inspections/',
        'PUT': '/v1/qaManager/inspections/',
        'DELETE': '/v1/qaManager/inspections/',
    }, requestBETA);



export const inspectionCreateBETA = inspectionsCRUDFunctionsBETA
    .setEventType(data => `CREATE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onCreate('/{tenant}/inspections/{inspectionId}', '');

export const inspectionUpdateBETA = inspectionsCRUDFunctionsBETA
    .setEventType(data => `UPDATE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onUpdate('/{tenant}/inspections/{inspectionId}', '');

export const inspectionDeleteBETA = inspectionsCRUDFunctionsBETA
    .setEventType(data => `DELETE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onDelete('/{tenant}/inspections/{inspectionId}', '');


//For contractor employee OQ check
const contractorCRUDFunctionsBETA = new CRUDFunction(
    'irestore-qa-manager-beta', <IRoutes>{
      'POST': '/beta-env/api/qam/contractorEmployeeOQ/',
      'PUT': '/beta-env/api/qam/contractorEmployeeOQ/',
      'DELETE': '/beta-env/api/qam/contractorEmployeeOQ/',
    }, requestBETA);

export const contractorCreateBETA = contractorCRUDFunctionsBETA.setEventType("CREATE_CONTRACTOR").onCreate('/{tenant}/contractors/{contractorId}', '');
