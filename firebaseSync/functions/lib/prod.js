"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CRUD_function_1 = require("./CRUD-function");
const request_1 = require("./request");
const utils_1 = require("./utils");
const requestPROD = new request_1.default({
    owner: 'demo',
    host: 'api.irestore.info',
    port: 443,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey: 'general',
}); //TODO: Move to a config file
const jobsCRUDFunctionsPROD = new CRUD_function_1.default('irestore-qa-manager-prod', {
    'POST': '/v1/qaManager/',
    'PUT': '/v1/qaManager/',
    'DELETE': '/v1/qaManager/',
}, requestPROD);
exports.jobCreatePROD = jobsCRUDFunctionsPROD.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
exports.jobUpdatePROD = jobsCRUDFunctionsPROD.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
exports.jobDeletePROD = jobsCRUDFunctionsPROD.setEventType("DELETE_JOB").onDelete('/{tenant}/jobs/{jobId}', '');
const deficienciesCRUDFunctionsPROD = new CRUD_function_1.default('irestore-qa-manager-prod', {
    'POST': '/v1/qaManager/deficiencies/',
    'PUT': '/v1/qaManager/deficiencies/',
    'DELETE': '/v1/qaManager/deficiencies/',
}, requestPROD);
exports.deficiencyCreatePROD = deficienciesCRUDFunctionsPROD.setEventType("CREATE_DEFICIENCY").onCreate('/{tenant}/deficiencies/{deficiencyId}', '');
exports.deficiencyUpdatePROD = deficienciesCRUDFunctionsPROD.setEventType("UPDATE_DEFICIENCY").onUpdate('/{tenant}/deficiencies/{deficiencyId}', '');
exports.deficiencyDeletePROD = deficienciesCRUDFunctionsPROD.setEventType("DELETE_DEFICIENCY").onDelete('/{tenant}/deficiencies/{deficiencyId}', '');
const inspectionsCRUDFunctionsPROD = new CRUD_function_1.default('irestore-qa-manager-prod', {
    'POST': '/v1/qaManager/inspections/',
    'PUT': '/v1/qaManager/inspections/',
    'DELETE': '/v1/qaManager/inspections/',
}, requestPROD);
exports.inspectionCreatePROD = inspectionsCRUDFunctionsPROD
    .setEventType(data => `CREATE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onCreate('/{tenant}/inspections/{inspectionId}', '');
exports.inspectionUpdatePROD = inspectionsCRUDFunctionsPROD
    .setEventType(data => `UPDATE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onUpdate('/{tenant}/inspections/{inspectionId}', '');
exports.inspectionDeletePROD = inspectionsCRUDFunctionsPROD
    .setEventType(data => `DELETE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onDelete('/{tenant}/inspections/{inspectionId}', '');
//For contractor employee OQ check
const contractorCRUDFunctionsProd = new CRUD_function_1.default('irestore-qa-manager-prod', {
    'POST': '/api/qam/contractorEmployeeOQ/',
    'PUT': '/api/qam/contractorEmployeeOQ/',
    'DELETE': '/api/qam/contractorEmployeeOQ/',
}, requestPROD);
exports.contractorCreateProd = contractorCRUDFunctionsProd.setEventType("CREATE_CONTRACTOR").onCreate('/{tenant}/contractors/{contractorId}', '');
//# sourceMappingURL=prod.js.map