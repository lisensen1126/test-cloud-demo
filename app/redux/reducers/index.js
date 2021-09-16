const initialState = {
    tags: {
        loading: true,
        items: [],
        pager: {
            page: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
        },
    },
    aaaa: 'aaaaa',
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'AA':
            return {
                ...state,
                aaaa: 'bbbbbb',
            };
        default:
            return state;
    }
};
