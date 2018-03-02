import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LoginIcon from './iconLogin/LoginIcon.jsx';
import AuthService from '../services/AuthService.jsx';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Header extends React.Component {

    Auth = new AuthService();

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="title" color="inherit">
                        Teacher Support
                    </Typography>
                    {this.Auth.loggedIn() && <LoginIcon /> 
                    }    
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Header);