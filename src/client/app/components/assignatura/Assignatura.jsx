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
  cursText: {
    textAlign: 'center',
    fontSize: 'small'
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

class Assignatura extends React.Component {

    constructor(props) {
        super(props);
    }

    handleEditarAssignatura () {
        let assignatura = {
            id: this.props.id,
            nom: this.props.nom,
            curs: this.props.curs.id
        };
        this.props.onEditAssignatura(assignatura);
    }

    handleEliminarAssignatura() {
        let assignatura = {
            id: this.props.id,
            nom: this.props.nom,
            curs: this.props.curs.id
        };
        this.props.onEliminarAssignatura(assignatura);
    }

    clickComponent() {
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Paper className={classes.root} elevation={4}>
                <Grid container spacing={24}>
                <Grid onClick={this.handleEditarAssignatura.bind(this)} item xs={6} sm={6}>
                    <IconaEditar />
                </Grid>
                <Grid onClick={this.handleEliminarAssignatura.bind(this)} className={classes.rightAlign} item xs={6} sm={6}>
                    <IconaEliminar />
                </Grid>
                </Grid>
                <div className={classes.pointerCursor} onClick={this.clickComponent.bind(this)}>
                <Typography variant="headline" component="h3" className={classes.textCenter}>
                {this.props.nom}
                </Typography>
                <Typography variant="headline" component="p" className={classes.cursText}>
                {this.props.curs.nom} ({this.props.curs.nivell})
                </Typography>
                </div>
            </Paper>
            </div>
        )
    }
}

Assignatura.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Assignatura);