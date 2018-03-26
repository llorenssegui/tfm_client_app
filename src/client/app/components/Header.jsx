import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LoginIcon from './iconLogin/LoginIcon.jsx';
import AuthService from '../services/AuthService.jsx';
import Grid from 'material-ui/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  pointerCursor: {
    cursor: 'pointer'
  },
  marginIcon: {
      marginRight: '100%'
  }
};

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    goHomePage() {
        window.location = "/";
    }

    Auth = new AuthService();

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <Grid  xs={12}><Typography 
                        variant="title" 
                        color="inherit" 
                        onClick={this.goHomePage.bind(this)}
                        className={classes.pointerCursor}
                    >
                        Teacher Support
                    </Typography></Grid>

                    {this.Auth.loggedIn() && <Grid  xs={true}><div className={classes.marginIcon}><LoginIcon /></div></Grid>
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