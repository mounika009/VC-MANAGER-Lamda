"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CRUD_function_1 = require("./CRUD-function");
const request_1 = require("./request");
const utils_1 = require("./utils");
const requestQA = new request_1.default({
    owner: 'demo',
    host: 'api-qa.irestore.info',
    port: 443,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey: 'general',
}); //TODO: Move to a config file
const jobsCRUDFunctionsQA = new CRUD_function_1.default('irestore-qa-manager-qa', {
    'POST': '/v1/qaManager/',
    'PUT': '/v1/qaManager/',
    'DELETE': '/v1/qaManager/',
}, requestQA);
exports.jobCreateQA = jobsCRUDFunctionsQA.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
exports.jobUpdateQA = jobsCRUDFunctionsQA.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
exports.jobDeleteQA = jobsCRUDFunctionsQA.setEventType("DELETE_JOB").onDelete('/{tenant}/jobs/{jobId}', '');
const deficienciesCRUDFunctionsQA = new CRUD_function_1.default('irestore-qa-manager-qa', {
    'POST': '/v1/qaManager/deficiencies/',
    'PUT': '/v1/qaManager/deficiencies/',
    'DELETE': '/v1/qaManager/deficiencies/',
}, requestQA);
exports.deficiencyCreateQA = deficienciesCRUDFunctionsQA.setEventType("CREATE_DEFICIENCY").onCreate('/{tenant}/deficiencies/{deficiencyId}', '');
exports.deficiencyUpdateQA = deficienciesCRUDFunctionsQA.setEventType("UPDATE_DEFICIENCY").onUpdate('/{tenant}/deficiencies/{deficiencyId}', '');
exports.deficiencyDeleteQA = deficienciesCRUDFunctionsQA.setEventType("DELETE_DEFICIENCY").onDelete('/{tenant}/deficiencies/{deficiencyId}', '');
const inspectionsCRUDFunctionsQA = new CRUD_function_1.default('irestore-qa-manager-qa', {
    'POST': '/v1/qaManager/inspections/',
    'PUT': '/v1/qaManager/inspections/',
    'DELETE': '/v1/qaManager/inspections/',
}, requestQA);
exports.inspectionCreateQA = inspectionsCRUDFunctionsQA
    .setEventType(data => `CREATE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onCreate('/{tenant}/inspections/{inspectionId}', '');
exports.inspectionUpdateQA = inspectionsCRUDFunctionsQA
    .setEventType(data => `UPDATE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onUpdate('/{tenant}/inspections/{inspectionId}', '');
exports.inspectionDeleteQA = inspectionsCRUDFunctionsQA
    .setEventType(data => `DELETE_INSPECTION_${utils_1.determineInsEventType(data.inspectionType)}`)
    .onDelete('/{tenant}/inspections/{inspectionId}', '');
//For contractor employee OQ check
const contractorCRUDFunctionsQA = new CRUD_function_1.default('irestore-qa-manager-qa', {
    'POST': '/qa/api/qam/contractorEmployeeOQ/',
    'PUT': '/qa/api/qam/contractorEmployeeOQ/',
    'DELETE': '/qa/api/qam/contractorEmployeeOQ/',
}, requestQA);
exports.contractorCreateQA = contractorCRUDFunctionsQA.setEventType("CREATE_CONTRACTOR").onCreate('/{tenant}/contractors/{contractorId}', '');
//# sourceMappingURL=qa.js.map