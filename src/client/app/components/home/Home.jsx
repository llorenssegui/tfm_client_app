import React from 'react';
import AuthService from '../../services/AuthService.jsx';
import withAuth from '../functions/withAuth.jsx';

class Home extends React.Component {
    
    Auth = new AuthService();

    handleLogout() {
        this.Auth.logout()
        this.props.history.replace('/login');
     }

    render() {
        return(
        <div>
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>);
    }
}

export default withAuth(Home);