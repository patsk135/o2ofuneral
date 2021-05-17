import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Ceremony from './components/Ceremony';
import Donation from './components/donation';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import React from 'react';
import Register from './components/Register';
import Store from './Store';
import Streaming from './components/streaming';
import Transaction from './components/Transaction';

const App = () => {
    return (
        <div className="App" style={{ width: '100vw', height: '100vh' }}>
            <Store>
                <Router>
                    <Header appName="o2oFuneral" />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/streaming/:roomID">
                            <Streaming />
                        </Route>
                        <Route path="/donation/:receiverId">
                            <Donation />
                        </Route>
                        <Route path="/ceremony">
                            <Ceremony />
                        </Route>
                        <Route path="/transaction">
                            <Transaction />
                        </Route>
                    </Switch>
                </Router>
            </Store>
        </div>
    );
};

export default App;
