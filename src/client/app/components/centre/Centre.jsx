import React from 'react';
import withAuth from '../functions/withAuth.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconaEditar from '../iconaEditar/IconaEditar.jsx';

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
      cursor: 'pointer',
    }),
    rightAlign: {
        textAlign: 'right'
    },
});

class Centre extends React.Component {

    constructor(props) {
        super(props);
    }

    handleEditarCentre() {
        let centre = {
            id: this.props.id,
            nom: this.props.nom,
            ubicacio: this.props.ubicacio
        };
        this.props.onEditCentre(centre);
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Paper className={classes.root} elevation={4}>
                    <div className={classes.rightAlign} onClick={this.handleEditarCentre.bind(this)}>
                        <IconaEditar />
                    </div>
                    <Typography variant="headline" component="h3">
                    {this.props.nom}
                    </Typography>
                    <Typography component="p">
                    {this.props.ubicacio}
                    </Typography>
                </Paper>
            </div>
        );
    }
}

Centre.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Centre));