const Reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLoggedIn: true
            };
        case 'logout':
            return { ...state, user: {}, token: '', isLoggedIn: false };
        default:
            return { state };
    }
};

export default Reducer;
