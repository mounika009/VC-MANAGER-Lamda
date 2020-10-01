"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineInsEventType = insType => {
    let eventType = '';
    switch (insType) {
        case 'inProgress':
            eventType = 'PROGRESS';
            break;
        case 'postConstruction':
            eventType = 'POSTCON';
            break;
        case 'preConstruction':
            eventType = 'PRECON';
            break;
        case 'targeted':
            eventType = 'TARGETED';
    }
    return eventType;
};
//# sourceMappingURL=index.js.map