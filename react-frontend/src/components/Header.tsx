import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import { Context } from '../Store';

const LoggedOutView = () => {
    // let history = useHistory();
    return (
        <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
                {/* <Button
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    HomeButton
                </Button> */}
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
                {/* <Button
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    HomeButton
                </Button> */}
                <Link to="/" className="nav-link">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/settings" className="nav-link">
                    <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/mockuser" className="nav-link">
                    <img
                        src={
                            '/Users/patsk135/coding/o2ofuneral/react-frontend/public/favicon.ico'
                        }
                        className="user-pic"
                        // alt={props.currentUser.username}
                    />
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
        </nav>
    );
};

export default Header;
