
export const determineInsEventType = insType => {
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
            eventType = 'TARGETED'
    }
    return eventType;
};