import React from 'react';
import AuthService from '../../services/AuthService.jsx';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    rigthAlign: {
        textAlign: 'rigth',
    }
};

class LoginIcon extends React.Component {

    Auth = new AuthService();

    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handleClose = () => {
        window.location = "/perfil";
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.setState({ anchorEl: null });
        this.Auth.logout();
        location.reload();
    };

    render() {
        const { classes } = this.props;
        let { anchorEl } = this.state;
        let open = Boolean(anchorEl);
            return(
                <div className={classes.rigthAlign}>
                    <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                    >
                    <MenuItem onClick={this.handleClose}>El meu perfil</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Sortir</MenuItem>
                    </Menu>
                </div>
            );
    }

}

LoginIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((LoginIcon));