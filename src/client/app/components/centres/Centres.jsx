import React from 'react';
import withAuth from '../functions/withAuth.jsx';
import Centre from '../centre/Centre.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import FormulariCrearCentre from './FormulariCrearCentre.jsx';
import Notificacio from '../notificacions/Notificacio.jsx';
import config from '../../../../../config.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
    },
});

class Centres extends React.Component {
    state = {
        formulariCrearCentreObert: false,
        mostrarNotificacio: false,
        titolCentreCreat: "Centre creat satisfactoriament",
        centreSeleccionat: undefined
    };

    constructor(props){
        super(props);
    }

    handleFormulari (event) {
        this.setState({ formulariCrearCentreObert: true, centreSeleccionat: undefined });
    }

    handleCloseFormulari (event) {
        this.setState({ formulariCrearCentreObert: false });
    }

    tancarNotificacio() {
        this.setState({mostrarNotificacio:false});
    }

    handleCrearCentre (centre) {
        this.setState({ formulariCrearCentreObert: false });
        let url = config.apiEndpoint + '/centres/';
        if(!centre.professor) centre.professor = this.props.professor;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(centre)
        }).then(function(response) {  
            return response.json();
        }).then((centre) => {
            this.setState({formulariCrearCentreObert:false});
            this.setState({mostrarNotificacio:true});
            this.props.onAddCentres(centre);
        });
    }

    handleActualitzarCentre(centre) {
        console.log(centre);
        this.setState({formulariCrearCentreObert: true, centreSeleccionat: centre});
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.centres.map(c => {
                        return(
                        <Grid item xs={12} sm={6}>
                            <Centre 
                                id={c.id}
                                nom={c.nom}
                                ubicacio={c.ubicacio}
                                onEditCentre={this.handleActualitzarCentre.bind(this)}
                            />
                        </Grid>);
                    })}
                    <Button onClick={this.handleFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button> 
                    <FormulariCrearCentre 
                        open={this.state.formulariCrearCentreObert}
                        handleClose={this.handleCloseFormulari.bind(this)}
                        onCreateCentre={this.handleCrearCentre.bind(this)}
                        centre={this.state.centreSeleccionat}
                        onUpdateCentre={this.handleActualitzarCentre.bind(this)}
                    />   
                    <Notificacio 
                        open={this.state.mostrarNotificacio}
                        missatge={this.state.titolCentreCreat}
                        onCloseNotificacio={this.tancarNotificacio.bind(this)}
                    />       
                </Grid>
            </div>
        );
    }
}

Centres.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Centres);