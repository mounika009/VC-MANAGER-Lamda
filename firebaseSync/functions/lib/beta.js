"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CRUD_function_1 = require("./CRUD-function");
const request_1 = require("./request");
const utils_1 = require("./utils");
const requestBETA = new request_1.default({
    owner: 'liberty',
    host: 'api-beta.irestore.info',
    port: 443,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey: 'general',
}); //TODO: Move to a config file
const jobsCRUDFunctionsBETA = new CRUD_function_1.default('irestore-qa-manager-beta', {
    'POST': '/v1/qaManager/',
    'PUT': '/v1/qaManager/',
    'DELETE': '/v1/qaManager/',
}, requestBETA);
exports.jobCreateBETA = jobsCRUDFunctionsBETA.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
exports.jobUpdateBETA = jobsCRUDFunctionsBETA.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
exports.jobDeleteBETA = jobsCRUDFunctionsBETA.setEventType("DELETE_JOB").onDelete('/{tenant}/jobs/{jobId}', '');
const deficienciesCRUDFunctionsBETA = new CRUD_function_1.default('irestore-qa-manager-beta', {
    'POST': '/v1/qaManager/deficiencies/',
    'PUT': '/v1/qaManager/deficiencies/',
    'DELETE': '/v1/qaManager/deficiencies/',
}, requestBETA);
exports.deficiencyCreateBETA = deficienciesCRUDFunctionsBETA.setEventType("CREATE_DEFICIENCY").onCreate('/{tenant}/deficiencies/{deficiencyId}', '');
exports.deficiencyUpdateBETA = deficienciesCRUDFunctionsBETA.setEventType("UPDATE_DEFICIENCY").onUpdate('/{tenant}/deficiencies/{deficiencyId}', '');
exports.deficiencyDeleteBETA = deficienciesCRUDFunctionsBETA.setEventType("DELETE_DEFICIENCY").onDelete('/{tenant}/deficiencies/{deficiencyId}', '');
const inspectionsCRUDFunctionsBETA = new CRUD_function_1.default('irestore-qa-manager-beta', {
    'POST': '/v1/qaManager/inspections/',
    'PUT': '/v1/qaManager/inspections/',
    'DELETE': '/v1/qaManager/inspections/',
}, requestBETA);
exports.inspectionCreateBETA = inspectionsCRUDFunctionsBETA
    .setEventType(data => `CREATE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onCreate('/{tenant}/inspections/{inspectionId}', '');
exports.inspectionUpdateBETA = inspectionsCRUDFunctionsBETA
    .setEventType(data => `UPDATE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onUpdate('/{tenant}/inspections/{inspectionId}', '');
exports.inspectionDeleteBETA = inspectionsCRUDFunctionsBETA
    .setEventType(data => `DELETE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onDelete('/{tenant}/inspections/{inspectionId}', '');
//For contractor employee OQ check
const contractorCRUDFunctionsBETA = new CRUD_function_1.default('irestore-qa-manager-beta', {
    'POST': '/beta-env/api/qam/contractorEmployeeOQ/',
    'PUT': '/beta-env/api/qam/contractorEmployeeOQ/',
    'DELETE': '/beta-env/api/qam/contractorEmployeeOQ/',
}, requestBETA);
exports.contractorCreateBETA = contractorCRUDFunctionsBETA.setEventType("CREATE_CONTRACTOR").onCreate('/{tenant}/contractors/{contractorId}', '');
//# sourceMappingURL=beta.js.map