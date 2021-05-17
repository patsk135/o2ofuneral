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
        case 'fetchUser':
            return { ...state, user: action.payload };
        case 'setLoading':
            return { ...state, isLoading: true };
        case 'finishLoading':
            return { ...state, isLoading: false };
        case 'showError':
            return {
                ...state,
                errMessage: action.payload,
                isError: true
            };
        case 'dismissError':
            return { ...state, isError: false };
        default:
            return { ...state };
    }
};

export default Reducer;
