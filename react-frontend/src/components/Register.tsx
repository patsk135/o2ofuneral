import { Link, useHistory } from 'react-router-dom';
import React, { ChangeEvent, useContext, useState } from 'react';

import API from '../utils/API';
import { Context } from '../Store';
import ErrorModal from './ErrorModal/ErrorModal';

const banks: {
    [key: string]: number | string;
} = {
    bbl: 'ธนาคารกรุงเทพ BBL',
    ktb: 'ธนาคารกรุงไทย KTB',
    bay: 'ธนาคารกรุงศรีอยุธยา BAY',
    kbank: 'ธนาคารกสิกรไทย KBANK',
    citi: 'ธนาคารซิตี้แบงค์ CITI',
    tmb: 'ธนาคารทหารไทย TMB',
    scb: 'ธนาคารไทยพาณิชย์ SCB',
    nbank: 'ธนาคารธนชาติ NBANK',
    gsb: 'ธนาคารออมสิน GSB',
    ghb: 'ธนาคารอาคารสงเคราะห์ GHB'
};

const Register = () => {
    const { state, dispatch } = useContext(Context) as any;

    let history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [bank_account, setBankAccount] = useState('');
    const [account_number, setAccountNumber] = useState('');

    const funcMapping: { [key: string]: any } = {
        username: setUsername,
        email: setEmail,
        password: setPassword,
        firstname: setFirstname,
        lastname: setLastname,
        account_number: setAccountNumber
    };

    const changeInput =
        (input: string): any =>
        (e: ChangeEvent<HTMLInputElement>) => {
            return funcMapping[input](e.target.value);
        };

    const register = () => {
        console.log(username);
        console.log(password);
        API.post('/auth/register', {
            username,
            email,
            password,
            firstname,
            lastname,
            bank_account,
            account_number
        }).then(async ({ data }) => {
            console.log(data);
            if (data.error) {
                console.log(data.error.message);
                // setErrMessage(data.error.message);
                // setIsError(true);
                dispatch({ type: 'showError', payload: data.error.message });
            } else {
                console.log('Account Registered.');
                // dispatch({ type: 'login', payload: data });
                dispatch({
                    type: 'showError',
                    payload: 'Check your email for the verification.'
                });
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
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign Up</h1>
                            <p className="text-xs-center">
                                <Link to="/login">Have an account?</Link>
                            </p>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    register();
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
                                    <fieldset className="form-group">
                                        <select
                                            className="form-control"
                                            id="bank_account"
                                            onChange={e => {
                                                // console.log(e.target.value);
                                                setBankAccount(e.target.value);
                                            }}
                                        >
                                            <option value="" disabled selected>
                                                Select your Bank Account
                                            </option>
                                            {Object.keys(banks).map(
                                                (each, index) => {
                                                    return (
                                                        <option value={each}>
                                                            {banks[each]}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="number"
                                            placeholder="Account Number"
                                            value={account_number}
                                            onChange={changeInput(
                                                'account_number'
                                            )}
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
            {state.isError && <ErrorModal></ErrorModal>}
        </div>
    );
};

export default Register;
