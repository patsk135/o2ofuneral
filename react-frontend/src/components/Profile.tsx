import React, { useContext, useEffect } from 'react';

import API from '../utils/API';
import { Context } from '../Store';

const Profile = () => {
    const { state, dispatch } = useContext(Context) as any;

    useEffect(() => {
        API.get('/auth/ping', {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        }).then(({ data }) => {
            console.log(data);
            dispatch({ type: 'fetchUser', payload: data });
        });
    }, []);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80vh',
                    width: '80vw',
                    paddingLeft: '10vw'
                }}
            >
                <b style={{ paddingTop: '5vh', fontSize: '5vh' }}>Profile</b>
                <div style={{ height: '3vh' }}></div>
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        paddingBottom: '3vh',
                        alignSelf: 'center',
                        fontSize: '2.5vh'
                    }}
                >
                    <b
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1vw'
                        }}
                    >
                        Username:
                    </b>
                    <a
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {state.user.username}
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        paddingBottom: '3vh',
                        alignSelf: 'center',
                        fontSize: '2vh'
                    }}
                >
                    <b
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1vw'
                        }}
                    >
                        Email:
                    </b>
                    <a
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {state.user.email}
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        paddingBottom: '3vh',
                        alignSelf: 'center',
                        fontSize: '2vh'
                    }}
                >
                    <b
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1vw'
                        }}
                    >
                        Name:
                    </b>
                    <a
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {state.user.firstname + ' ' + state.user.lastname}
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        paddingBottom: '3vh',
                        alignSelf: 'center',
                        fontSize: '2vh'
                    }}
                >
                    <b
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1vw'
                        }}
                    >
                        Bank Account:
                    </b>
                    <a
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {state.user.bank_account.toUpperCase()}
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        paddingBottom: '3vh',
                        alignSelf: 'center',
                        fontSize: '2vh'
                    }}
                >
                    <b
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1vw'
                        }}
                    >
                        Account Number:
                    </b>
                    <a
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {state.user.account_number}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
