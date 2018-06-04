import React from 'react';
import Login from './login/Login.jsx';
import Home from './home/Home.jsx';
import Registre from './registre/Registre.jsx';
import Perfil from './perfil/Perfil.jsx';
import Autor from './autor/Autor.jsx';
import NoTrobat from './notrobat/NoTrobat.jsx';
import Assignatures from './assignatures/Assignatures.jsx';
import AnysAcademics from './anysAcademics/AnysAcademics.jsx';
import Gestio from './gestio/Gestio.jsx';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import withAuth from './functions/withAuth.jsx';

var globarProps = undefined;

class Main extends React.Component {
    /* <Route component={NoTrobat}/>  - {this.props.match.params.idCentre}*/

    state = {}

    constructor(props) {
        super(props);
        globarProps = this.props;
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/centres' component={Home} />
                  <Route exact path='/centres/:idCentre' component={AnysAcademics} />
                  <Route exact path='/centres/:idCentre/anyacademic/:anyAcademic/:idAnyAcademic' component={Assignatures} />
                  <Route exact path='/centres/:idCentre/anyacademic/:anyAcademic/:idAnyAcademic/assignatura/:idAssignatura' component={Gestio} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/registre' component={Registre} />
                  <Route exact path='/perfil' component={Perfil} />
                  <Route exact path='/autor' component={Autor} />
                  <Route component={NoTrobat}/> 
               </Switch>
            </BrowserRouter>
        );
    }
}

export default (Main);