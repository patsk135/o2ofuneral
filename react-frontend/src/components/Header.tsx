import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import { Context } from '../Store';

const LoggedOutView = () => {
    // let history = useHistory();
    return (
        <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Sign in
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Sign up
                </Link>
            </li>
        </ul>
    );
};

const LoggedInView = () => {
    const { state, dispatch } = useContext(Context) as any;

    return (
        <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/ceremony" className="nav-link">
                    Ceremony
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/transaction" className="nav-link">
                    Transaction
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/profile" className="nav-link">
                    {state.user.username}
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    to="/"
                    onClick={e => dispatch({ type: 'logout' })}
                    className="nav-link"
                >
                    Log Out
                </Link>
            </li>
        </ul>
    );
};

interface HeaderProps {
    appName: string;
}

const Header = ({ appName }: HeaderProps) => {
    const { state, dispatch } = useContext(Context) as any;

    return (
        <nav className="navbar navbar-light">
            <div style={{ height: '2vh' }}></div>
            <div className="container">
                {/* {JSON.stringify(state.isLoggedIn)} */}
                <Link to="/" className="navbar-brand">
                    {appName}
                </Link>
                {state.isLoggedIn ? (
                    <LoggedInView></LoggedInView>
                ) : (
                    <LoggedOutView></LoggedOutView>
                )}
            </div>
            <div style={{ height: '5vh' }}></div>
        </nav>
    );
};

export default Header;
