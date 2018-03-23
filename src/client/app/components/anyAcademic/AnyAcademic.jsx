import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconaCalendari from '../iconaCalendari/IconaCalendari.jsx';
import IconaEditar from '../iconaEditar/IconaEditar.jsx';
import IconaEliminar from '../iconaEliminar/IconaEliminar.jsx';
import Grid from 'material-ui/Grid';

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
  },
  rightAlign: {
    textAlign: 'right'
  },
  leftAlign: {
    textAlign: 'left'
  },
  pointerCursor: {
    cursor: 'pointer'
  },
});

class AnyAcademic extends React.Component {

    constructor(props) {
        super(props);
    }

    handleEditarAnyAcademic () {
        let anyAcademic = {
            id: this.props.id,
            anyInici: this.props.anyInici,
            anyFi: this.props.anyFi
        };
        this.props.onEditAnyAcademic(anyAcademic);
    }

    handleEliminarAnyAcademic() {
        let anyAcademic = {
            id: this.props.id,
            anyInici: this.props.anyInici,
            anyFi: this.props.anyFi
        };
        this.props.onEliminarAnyAcademic(anyAcademic);
    }

    clickComponent() {
        this.props.onSeleccionarAnyAcademic("" + this.props.anyInici + this.props.anyFi, this.props.id);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Paper className={classes.root} elevation={4}>
                <Grid container spacing={24}>
                <Grid onClick={this.handleEditarAnyAcademic.bind(this)} item xs={6} sm={6}>
                    <IconaEditar />
                </Grid>
                <Grid onClick={this.handleEliminarAnyAcademic.bind(this)} className={classes.rightAlign} item xs={6} sm={6}>
                    <IconaEliminar />
                </Grid>
                </Grid>
                <div className={classes.pointerCursor} onClick={this.clickComponent.bind(this)}>
                <Typography variant="headline" component="h3" className={classes.textCenter}>
                {this.props.anyInici} - {this.props.anyFi}
                </Typography>
                <div className={classes.iconCenter}>
                <IconaCalendari />
                </div>
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