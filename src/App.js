import './App.css';

import React from "react";

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Register from './pages/Register';




function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/homepage">
            <Homepage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;