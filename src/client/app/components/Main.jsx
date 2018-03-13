import React from 'react';
import Login from './login/Login.jsx';
import Home from './home/Home.jsx';
import NoTrobat from './notrobat/NoTrobat.jsx';
import AnysAcademics from './anysAcademics/AnysAcademics.jsx';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';

class Main extends React.Component {
    /* <Route component={NoTrobat}/>  - {this.props.match.params.idCentre}*/
    render() {
        return (
            <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/centres' component={Home} />
                  <Route exact path='/centres/:idCentre' component={AnysAcademics} />
                  <Route exact path='/login' component={Login} />
                  <Route component={NoTrobat}/> 
               </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;