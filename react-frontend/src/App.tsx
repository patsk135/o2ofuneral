import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Donation from './components/donation';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import React from 'react';
import Register from './components/Register';
import Store from './Store';

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
                        <Route path="/donation">
                            <Donation />
                        </Route>
                    </Switch>
                </Router>
            </Store>
        </div>
    );
};

export default App;
