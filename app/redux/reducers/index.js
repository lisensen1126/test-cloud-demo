export default (state = {} || {}, action) => {
    console.log('action', action);

    switch (action.type) {
        case 'ADDNAME':
            console.log('触发reducers', state);
            return {
                time: new Date().getTime(),
            };
        default:
            return (
                window.store.getState().TAG || {
                    time: new Date().getTime(),
                }
            );
    }
};
