import React from 'react';
import Login from './login/Login.jsx';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';

class Main extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/login' component={Login} />
               </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;