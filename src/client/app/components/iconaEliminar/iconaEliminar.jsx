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
});

function SvgIconaEliminar(props) {
    return (
      <SvgIcon>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

class IconaEliminar extends React.Component {

    render() {
        const { classes } = this.props;
        return (
                <SvgIconaEliminar className={classes.icon}>add_circle</SvgIconaEliminar>
        );
    }
}

IconaEliminar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconaEliminar);