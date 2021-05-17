import './ErrorModal.css';

import React, { useContext } from 'react';

import { Context } from '../../Store';

const ErrorModal = () => {
    const { state, dispatch } = useContext(Context) as any;

    return (
        <div className="mymodal">
            {state.errMessage}
            <div style={{ height: '2vh' }}></div>
            <button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={e => {
                    dispatch({ type: 'dismissError' });
                }}
            >
                Close
            </button>
        </div>
    );
};

export default ErrorModal;
