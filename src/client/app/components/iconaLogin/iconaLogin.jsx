import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Icon from 'material-ui/Icon';
import SvgIcon from 'material-ui/SvgIcon';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: green[200],
    },
  },
  pointerCursor: {
    cursor: 'pointer'
  }
});

function SvgIconaLogin(props) {
    return (
      <SvgIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

class IconaLogin extends React.Component {

    render() {
        const { classes } = this.props;
        return (
                <span className={classes.pointerCursor}><SvgIconaLogin className={classes.icon}>add_circle</SvgIconaLogin></span>
        );
    }
}

IconaLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconaLogin);