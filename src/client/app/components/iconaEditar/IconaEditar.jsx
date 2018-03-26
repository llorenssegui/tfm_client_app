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

function SvgIconaEditar(props) {
    return (
      <SvgIcon>
        <path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M0 20h24v4H0z" fillOpacity=".36"/>
      </SvgIcon>
    );
  }

class IconaEditar extends React.Component {

    render() {
        const { classes } = this.props;
        return (
                <span className={classes.pointerCursor}><SvgIconaEditar className={classes.icon}>add_circle</SvgIconaEditar></span>
        );
    }
}

IconaEditar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconaEditar);