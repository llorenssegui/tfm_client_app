import React from 'react';
import AuthService from '../../services/AuthService.jsx';

export default function withAuth(AuthComponent, history) {
    const Auth = new AuthService();
    
    return class AuthWrapped extends React.Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                if(history) history.replace('/login');
                else this.props.history.replace('/login');
            } else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    });
                } catch(err) {
                    Auth.logout();
                    if(history) history.replace('/login');
                    else this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent properties={this.props} history={this.props.history} user={this.state.user} />
                );
            } else {
                return null;
            }
        }
    }
}