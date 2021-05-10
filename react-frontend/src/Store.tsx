import React, { createContext, useReducer } from 'react';

import Reducer from './Reducer';

const initialState = {
    user: {},
    token: '',
    isLoggedIn: false
};

const Store = ({ children }: any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    let value: any = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export default Store;
