import { Link, useHistory } from 'react-router-dom';
import React, { ChangeEvent, useContext, useState } from 'react';

import API from '../utils/API';
import { Context } from '../Store';
import ErrorModal from './ErrorModal/ErrorModal';

const Login = () => {
    const { state, dispatch } = useContext(Context) as any;

    let history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const funcMapping: { [key: string]: any } = {
        username: setUsername,
        password: setPassword
    };

    const changeInput =
        (input: string): any =>
        (e: ChangeEvent<HTMLInputElement>) => {
            return funcMapping[input](e.target.value);
        };

    const login = () => {
        console.log(username);
        console.log(password);
        API.post('/auth/login', {
            username,
            password
        }).then(async ({ data }) => {
            console.log(data);
            if (data.error) {
                console.log(data.error.message);
                // setErrMessage(data.error.message);
                // setIsError(true);
                dispatch({ type: 'showError', payload: data.error.message });
            } else {
                dispatch({ type: 'login', payload: data });
                history.push('/');
            }
        });
    };

    return (
        <div>
            <div
                className={
                    !state.isError ? 'auth-page' : 'auth-page avoid-clicks'
                }
            >
                <div className="container page">
                    <div className="row">
                        {/* {JSON.stringify(state.isLoggedIn)} */}
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign In</h1>
                            <p className="text-xs-center">
                                <Link to="/register">Need an account?</Link>
                            </p>

                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    login();
                                }}
                            >
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={changeInput('username')}
                                        />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={changeInput('password')}
                                        />
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                    >
                                        Sign in
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {state.isError && <ErrorModal></ErrorModal>}
        </div>
    );
};

export default Login;
