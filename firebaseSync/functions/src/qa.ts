import IRoutes from "./contracts/routes";
import CRUDFunction from "./CRUD-function";
import Request from "./request";
import {determineInsEventType} from "./utils";


const requestQA = new Request({
    owner       : 'demo',
    host        : 'api-qa.irestore.info',
    port        : 443,
    accessToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey  : 'general',
}) ;//TODO: Move to a config file

const jobsCRUDFunctionsQA = new CRUDFunction(
    'irestore-qa-manager-qa', <IRoutes>{
        'POST': '/v1/qaManager/',
        'PUT': '/v1/qaManager/',
        'DELETE': '/v1/qaManager/',
    }, requestQA);


export const jobCreateQA = jobsCRUDFunctionsQA.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
export const jobUpdateQA = jobsCRUDFunctionsQA.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
export const jobDeleteQA = jobsCRUDFunctionsQA.setEventType("DELETE_JOB").onDelete('/{tenant}/jobs/{jobId}', '');

const deficienciesCRUDFunctionsQA = new CRUDFunction(
    'irestore-qa-manager-qa', <IRoutes>{
        'POST': '/v1/qaManager/deficiencies/',
        'PUT': '/v1/qaManager/deficiencies/',
        'DELETE': '/v1/qaManager/deficiencies/',
    }, requestQA);


export const deficiencyCreateQA = deficienciesCRUDFunctionsQA.setEventType("CREATE_DEFICIENCY").onCreate('/{tenant}/deficiencies/{deficiencyId}', '');
export const deficiencyUpdateQA = deficienciesCRUDFunctionsQA.setEventType("UPDATE_DEFICIENCY").onUpdate('/{tenant}/deficiencies/{deficiencyId}', '');
export const deficiencyDeleteQA = deficienciesCRUDFunctionsQA.setEventType("DELETE_DEFICIENCY").onDelete('/{tenant}/deficiencies/{deficiencyId}', '');


const inspectionsCRUDFunctionsQA = new CRUDFunction(
    'irestore-qa-manager-qa', <IRoutes>{
        'POST': '/v1/qaManager/inspections/',
        'PUT': '/v1/qaManager/inspections/',
        'DELETE': '/v1/qaManager/inspections/',
    }, requestQA);



export const inspectionCreateQA = inspectionsCRUDFunctionsQA
    .setEventType(data => `CREATE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onCreate('/{tenant}/inspections/{inspectionId}', '');

export const inspectionUpdateQA = inspectionsCRUDFunctionsQA
    .setEventType(data => `UPDATE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onUpdate('/{tenant}/inspections/{inspectionId}', '');

export const inspectionDeleteQA = inspectionsCRUDFunctionsQA
    .setEventType(data => `DELETE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onDelete('/{tenant}/inspections/{inspectionId}', '');

//For contractor employee OQ check
const contractorCRUDFunctionsQA = new CRUDFunction(
    'irestore-qa-manager-qa', <IRoutes>{
      'POST': '/qa/api/qam/contractorEmployeeOQ/',
      'PUT': '/qa/api/qam/contractorEmployeeOQ/',
      'DELETE': '/qa/api/qam/contractorEmployeeOQ/',
    }, requestQA);

export const contractorCreateQA = contractorCRUDFunctionsQA.setEventType("CREATE_CONTRACTOR").onCreate('/{tenant}/contractors/{contractorId}', '');



