"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CRUD_function_1 = require("./CRUD-function");
const request_1 = require("./request");
const request = new request_1.default({
    owner: 'dev',
    host: "dev.irestore.info",
    port: 443,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpUmVzdG9yZSIsImF1ZCI6ImdlbmVyYWwiLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTQ2OTA4NzYwMX0.48fKAGieV0j9kQDu9wlaLi6a1B837nuCqthJmROSy-0',
    accountKey: 'general',
}); //TODO: Move to a config file
//For Jobs
const jobsCRUDFunctions = new CRUD_function_1.default('irestore-vcmanager-dev', {
    'POST': '/dev/api/vcm/jobs/',
    'PUT': '/dev/api/vcm/jobs/',
    'DELETE': '/dev/api/vcm/jobs/',
}, request);
exports.jobCreate = jobsCRUDFunctions.setEventType("CREATE_JOB").onCreate('/{tenant}/jobs/{jobId}', '');
exports.jobUpdate = jobsCRUDFunctions.setEventType("UPDATE_JOB").onUpdate('/{tenant}/jobs/{jobId}', '');
//# sourceMappingURL=dev.js.map