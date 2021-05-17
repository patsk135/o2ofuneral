import React, { useContext, useState } from 'react';

import { Context } from '../Store';
import Streaming from './streaming';
import { useHistory } from 'react-router';

const Home = () => {
    const { state, dispatch } = useContext(Context) as any;

    const [isOpen, setIsOpen] = useState(false);

    let history = useHistory();

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{ height: '40vh' }}></div>
            <button
                className="btn btn-lg btn-primary"
                onClick={e => {
                    history.push('/streaming/base');
                }}
            >
                Watch Live Stream
            </button>
        </div>
    );
};

export default Home;
