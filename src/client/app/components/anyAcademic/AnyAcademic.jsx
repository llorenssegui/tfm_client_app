import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconaCalendari from '../iconaCalendari/IconaCalendari.jsx';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textCenter: {
      textAlign: 'center'
  },
  iconCenter: {
    textAlign: 'center',
    marginTop: '3px'
  }
});

class AnyAcademic extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant="headline" component="h3" className={classes.textCenter}>
                {this.props.anyInici} - {this.props.anyFi}
                </Typography>
                <div className={classes.iconCenter}>
                <IconaCalendari />
                </div>
            </Paper>
            </div>
        )
    }
}

AnyAcademic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnyAcademic);