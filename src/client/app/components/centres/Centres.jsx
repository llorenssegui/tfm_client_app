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
import AlertDialog from '../dialogs/AlertDialog.jsx';
import config from '../../../../../config.js';
import Utils from '../../utils.jsx';

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
        alertDialogObert: false,
        mostrarNotificacio: false,
        titolNotificacio: "Centre creat satisfactoriament",
        textAlertDialog: "Segur que vols eliminar el centre seleccionat?",
        titolAlertDialog: "",
        centreSeleccionat: undefined
    };

    constructor(props){
        super(props);
        this.utils = new Utils();
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
            this.setState({formulariCrearCentreObert:false, 
                titolNotificacio: "Centre creat satisfactoriament", 
                mostrarNotificacio:true
            });
            this.props.onAddCentres(centre);
        });
    }

    handleActualitzarCentre(centre) {
        let url = config.apiEndpoint + '/centres/' + centre.id + '/';
        if(!centre.professor) centre.professor = this.props.professor;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(centre)
        }).then(function(response) {  
            return response.json();
        }).then((centre) => {
            this.setState({formulariCrearCentreObert: false, 
                centreSeleccionat: undefined,
                titolNotificacio: "Centre modificat satisfactoriament",
                mostrarNotificacio: true
            });
            let index = this.utils.getIndexElement(this.props.centres, "id", centre);
            this.props.onAddCentres(centre,index);
        });
    }

    openActualitzarFormCentre(centre) {
        this.setState({formulariCrearCentreObert: true, centreSeleccionat: centre});
    }

    openDialogBorrarCentre(centre) {
        this.setState({alertDialogObert: true, centreSeleccionat: centre, titolAlertDialog: centre.nom});
    }

    tancarAlertDialog() {
        this.setState({alertDialogObert: false, centreSeleccionat: undefined});
    }

    borrarCentre() {
        let url = config.apiEndpoint + '/centres/' + this.state.centreSeleccionat.id + '/';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((centre) => {
            let index = this.utils.getIndexElement(this.props.centres, "id", this.state.centreSeleccionat);
            this.setState({alertDialogObert: false, 
                centreSeleccionat: undefined,
                titolNotificacio: "Centre eliminat satisfactoriament",
                mostrarNotificacio: true
            });
            this.props.onBorrarCentre(index);
        });
    }

    seleccionarcentre(id) {
        this.props.history.push("/centres/" + id);
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.centres.map((c, index) => {
                        return(
                        <Grid item xs={12} sm={12} md={6}>
                            <Centre 
                                id={c.id}
                                posicio={index}
                                nom={c.nom}
                                ubicacio={c.ubicacio}
                                onEditCentre={this.openActualitzarFormCentre.bind(this)}
                                onEliminarCentre={this.openDialogBorrarCentre.bind(this)}
                                onSeleccionarCentre={this.seleccionarcentre.bind(this)}
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
                    <AlertDialog 
                        open={this.state.alertDialogObert}
                        titol={this.state.titolAlertDialog}
                        missatge={this.state.textAlertDialog}
                        onCloseDialog={this.tancarAlertDialog.bind(this)}
                        confirmarAccio={this.borrarCentre.bind(this)}
                    />   
                    <Notificacio 
                        open={this.state.mostrarNotificacio}
                        missatge={this.state.titolNotificacio}
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

export default withStyles(styles)((Centres));