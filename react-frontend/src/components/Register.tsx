import React, { ChangeEvent, useState } from 'react';

import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const funcMapping: { [key: string]: any } = {
        username: setUsername,
        email: setEmail,
        password: setPassword,
        firstname: setFirstname,
        lastname: setLastname
    };

    const changeInput = (input: string): any => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        return funcMapping[input](e.target.value);
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign Up</h1>
                        <p className="text-xs-center">
                            <Link to="/login">Have an account?</Link>
                        </p>
                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={changeInput('username')}
                                    ></input>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={changeInput('email')}
                                    ></input>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={changeInput('password')}
                                    ></input>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="FirstName"
                                        value={firstname}
                                        onChange={changeInput('firstname')}
                                    ></input>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="LastName"
                                        value={lastname}
                                        onChange={changeInput('lastname')}
                                    ></input>
                                </fieldset>

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
