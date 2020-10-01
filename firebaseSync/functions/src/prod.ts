import IRoutes from "./contracts/routes";
import CRUDFunction from "./CRUD-function";
import Request from "./request";
import {determineInsEventType} from "./utils";


const requestPROD = new Request({
    owner       : 'demo',
    host        : 'api.irestore.info',
    port        : 443,
    accessToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey  : 'general',
}) ;//TODO: Move to a config file

const jobsCRUDFunctionsPROD = new CRUDFunction(
    'irestore-qa-manager-prod', <IRoutes>{
        'POST': '/v1/qaManager/',
        'PUT': '/v1/qaManager/',
        'DELETE': '/v1/qaManager/',
    }, requestPROD);


export const jobCreatePROD = jobsCRUDFunctionsPROD.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
export const jobUpdatePROD = jobsCRUDFunctionsPROD.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
export const jobDeletePROD = jobsCRUDFunctionsPROD.setEventType("DELETE_JOB").onDelete('/{tenant}/jobs/{jobId}', '');

const deficienciesCRUDFunctionsPROD = new CRUDFunction(
    'irestore-qa-manager-prod', <IRoutes>{
	    'POST': '/v1/qaManager/deficiencies/',
	    'PUT': '/v1/qaManager/deficiencies/',
	    'DELETE': '/v1/qaManager/deficiencies/',
    }, requestPROD);


export const deficiencyCreatePROD = deficienciesCRUDFunctionsPROD.setEventType("CREATE_DEFICIENCY").onCreate('/{tenant}/deficiencies/{deficiencyId}', '');
export const deficiencyUpdatePROD = deficienciesCRUDFunctionsPROD.setEventType("UPDATE_DEFICIENCY").onUpdate('/{tenant}/deficiencies/{deficiencyId}', '');
export const deficiencyDeletePROD = deficienciesCRUDFunctionsPROD.setEventType("DELETE_DEFICIENCY").onDelete('/{tenant}/deficiencies/{deficiencyId}', '');


const inspectionsCRUDFunctionsPROD = new CRUDFunction(
    'irestore-qa-manager-prod', <IRoutes>{
	    'POST': '/v1/qaManager/inspections/',
	    'PUT': '/v1/qaManager/inspections/',
	    'DELETE': '/v1/qaManager/inspections/',
    }, requestPROD);



export const inspectionCreatePROD = inspectionsCRUDFunctionsPROD
    .setEventType(data => `CREATE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onCreate('/{tenant}/inspections/{inspectionId}', '');

export const inspectionUpdatePROD = inspectionsCRUDFunctionsPROD
    .setEventType(data => `UPDATE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onUpdate('/{tenant}/inspections/{inspectionId}', '');

export const inspectionDeletePROD = inspectionsCRUDFunctionsPROD
    .setEventType(data => `DELETE_INSPECTION_${determineInsEventType(data.inspectionType)}`)
    .onDelete('/{tenant}/inspections/{inspectionId}', '');

//For contractor employee OQ check
const contractorCRUDFunctionsProd = new CRUDFunction(
    'irestore-qa-manager-prod', <IRoutes>{
      'POST': '/api/qam/contractorEmployeeOQ/',
      'PUT': '/api/qam/contractorEmployeeOQ/',
      'DELETE': '/api/qam/contractorEmployeeOQ/',
    }, requestPROD);

export const contractorCreateProd = contractorCRUDFunctionsProd.setEventType("CREATE_CONTRACTOR").onCreate('/{tenant}/contractors/{contractorId}', '');

