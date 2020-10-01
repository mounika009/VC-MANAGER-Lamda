"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
class CRUDFunction {
    constructor(firebaseInstance, routes, request) {
        this.firebaseInstance = firebaseInstance;
        this.routes = routes;
        this.request = request;
        this.eventType = null;
    }
    onCreate(ref, uniqueID) {
        return functions.database.instance(this.firebaseInstance).ref(ref)
            .onCreate(this._onCreate.bind(this, uniqueID, this.eventType));
    }
    onUpdate(ref, uniqueID) {
        return functions.database.instance(this.firebaseInstance).ref(ref)
            .onUpdate(this._onUpdate.bind(this, uniqueID, this.eventType));
    }
    onDelete(ref, uniqueID) {
        return functions.database.instance(this.firebaseInstance).ref(ref)
            .onDelete(this._onDelete.bind(this, uniqueID, this.eventType));
    }
    setEventType(eventType) {
        this.eventType = eventType;
        return this;
    }
    _onCreate(uniqueID, eventType, snap, context) {
        return __awaiter(this, void 0, void 0, function* () {
            let createdData = snap.val();
            console.info(`The context is `, context);
            console.info(`The newly inserted data is `, createdData);
            let data = JSON.stringify({
                data: createdData,
                auth: context.auth,
                authType: context.authType,
                timestamp: context.timestamp,
            });
            let result = yield this.request.makeRequest({
                path: this.routes['POST'],
                method: 'POST',
                owner: context.params.tenant
            }, data);
            if (result.Error || result.report.Error)
                throw new Error(result.Error.message);
            console.info(`The response from the API is : `, result);
            updateLogs(result, snap, eventType);
            return null;
        });
    }
    _onUpdate(uniqueID, eventType, change, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const newData = change.after.val(), oldData = change.before.val();
            console.info(`Updated data is `, newData);
            let data = JSON.stringify({
                previousData: oldData,
                newData,
                auth: context.auth,
                authType: context.authType,
                timestamp: context.timestamp
            });
            const path = uniqueID ? '/' + oldData[uniqueID] : '';
            let result = yield this.request.makeRequest({
                path: `${this.routes['PUT']}${path}`,
                method: 'PUT',
                owner: context.params.tenant
            }, data);
            if (result.Error || result.report.Error)
                throw new Error(result.Error.message);
            console.info(`The response from the API is : `, result);
            if (eventType === "UPDATE_DEFICIENCY") {
                let responseFromApi = JSON.parse(result.report);
                if (responseFromApi.log.actionType === "RESOLVE") {
                    eventType = "RESOLVE_DEFICIENCY";
                }
            }
            console.info(`The event type is : `, eventType);
            updateLogs(result, change.after, eventType);
            return null;
        });
    }
    _onDelete(uniqueId, eventType, snap, context) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`Data being deleted bears the ${uniqueId} of  `, snap.val()[uniqueId]);
            let data = JSON.stringify({
                auth: context.auth,
                authType: context.authType,
                timestamp: context.timestamp
            });
            const path = uniqueId ? '/' + snap.val()[uniqueId] : '';
            let result = yield this.request.makeRequest({
                path: `${this.routes['DELETE']}` + path,
                method: 'DELETE',
                owner: context.params.tenant
            }, data);
            if (result.Error || result.report.Error)
                throw new Error(result.Error.message);
            console.info(`The response from the API is : `, result);
            updateLogs(result, snap, eventType);
            return null;
        });
    }
}
exports.default = CRUDFunction;
const updateLogs = (result, event, eventType) => {
    const newLogItem = result.log || result.report ? JSON.parse(result.report).log : null;
    if (!newLogItem) {
        console.warn('There was no log created');
        return;
    }
    console.info('Updating logs from', newLogItem);
    const jobId = newLogItem.beforeChange ? newLogItem.beforeChange.jobId : newLogItem.changedFields.jobId;
    let logItem = {
        dateCreated: newLogItem.createdAt || new Date().toISOString(),
        dateModified: newLogItem.updatedAt || new Date().toISOString(),
        updatedBy: newLogItem.updatedBy || {},
        submittedBy: newLogItem.createdBy || {},
        eventType: typeof eventType == "function"
            ? eventType.call(this, event.val())
            : eventType || newLogItem.actionType,
        jobId: jobId,
        eventData: {
            before: newLogItem.beforeChange || {},
            after: newLogItem.changedFields || {}
        }
    };
    event.ref.parent.parent
        .child(`activityLogs`).child(jobId)
        .push(logItem)
        .then(() => console.info(`Successfully inserted new activity log : `, logItem))
        .catch(console.error);
};
//# sourceMappingURL=index.js.map