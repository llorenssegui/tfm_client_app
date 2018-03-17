import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AnyAcademic from '../anyAcademic/AnyAcademic.jsx';
import config from '../../../../../config.js';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FormulariCrearAnyAcademic from './FormulariCrearAnyAcademic.jsx';
import Notificacio from '../notificacions/Notificacio.jsx';
import Utils from '../../utils.jsx';
import AlertDialog from '../dialogs/AlertDialog.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '5%'
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
    },
});

class AnysAcademics extends React.Component {

    state = {
        anysAcademics: [],
        formulariCrearAnyAcademicObert: false,
        alertDialogObert: false,
        textAlertDialog: "Segur que vols eliminar l'any acadèmic seleccionat?",
        titolAlertDialog: "",
        anyAcademicSeleccionat: undefined,
        centre: this.props.match.params.idCentre
    };

    constructor(props) {
        super(props);
        this.utils = new Utils();
    }

    handleFormulari (event) {
        this.setState({ formulariCrearAnyAcademicObert: true, anyAcademicSeleccionat: undefined });
    }

    handleCloseFormulari (event) {
        this.setState({ formulariCrearAnyAcademicObert: false });
    }

    handleCrearAnyAcademic (anyAcademic) {
        let url = config.apiEndpoint + '/anysacademics/';
        if(!anyAcademic.centre) anyAcademic.centre = this.state.centre;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anyAcademic)
        }).then(function(response) {  
            return response.json();
        }).then((anyAcademic) => {
            this.setState({formulariCrearAnyAcademicObert:false, 
                titolNotificacio: "Any academic creat satisfactoriament", 
                mostrarNotificacio:true,
                anysAcademics: this.state.anysAcademics.concat([anyAcademic])
            });
        });
    }

    handleActualitzarAnyAcademic(anyAcademic) {
        let url = config.apiEndpoint + '/anysacademics/' + anyAcademic.id + '/';
        if(!anyAcademic.centre) anyAcademic.centre = this.state.centre;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anyAcademic)
        }).then(function(response) {  
            return response.json();
        }).then((anyAcademic) => {
            this.setState({formulariCrearAnyAcademicObert: false, 
                anyAcademicSeleccionat: undefined,
                titolNotificacio: "Any acadèmic modificat satisfactoriament",
                mostrarNotificacio: true
            });
            let index = this.utils.getIndexElement(this.state.anysAcademics, "id", anyAcademic);
            if(index !== -1) {
                let nousAnysAcademics = this.state.anysAcademics;
                nousAnysAcademics[index] = anyAcademic;
                this.setState({
                    anysAcademics: nousAnysAcademics
                });
            }
        });
    }

    openActualitzarFormAnyAcademic(anyAcademic) {
        this.setState({formulariCrearAnyAcademicObert: true, anyAcademicSeleccionat: anyAcademic});
    }

    tancarNotificacio() {
        this.setState({mostrarNotificacio:false});
    }

    openDialogBorrarAnyAcademic(anyAcademic) {
        this.setState({alertDialogObert: true, anyAcademicSeleccionat: anyAcademic, titolAlertDialog: anyAcademic.anyInici + " - " + anyAcademic.anyFi});
    }

    tancarAlertDialog() {
        this.setState({alertDialogObert: false, anyAcademicSeleccionat: undefined});
    }

    borrarAnyAcademic() {
        let url = config.apiEndpoint + '/anysacademics/' + this.state.anyAcademicSeleccionat.id + '/';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((anyAcademic) => {
            let index = this.utils.getIndexElement(this.state.anysAcademics, "id", this.state.anyAcademicSeleccionat);
            this.setState({alertDialogObert: false, 
                anyAcademicSeleccionat: undefined,
                titolNotificacio: "Any acadèmic eliminat satisfactoriament",
                mostrarNotificacio: true
            });
            let nousAnysAcademics = this.state.anysAcademics;
            if(index !== -1) {
                this.setState({
                    anysAcademics: nousAnysAcademics.splice(index, 1)
                });
            }
        });
    }

    componentDidMount() {
        let url = config.apiEndpoint + '/anysacademics/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((anysAcademics) => {
            let filteredanysAcademics = anysAcademics.filter((anyAcademic) => anyAcademic.centre == this.props.match.params.idCentre);
            this.setState({ anysAcademics: filteredanysAcademics, centre: this.props.match.params.idCentre});
            
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={6}>
                    <Grid container spacing={24}>
                    {this.state.anysAcademics.map((aa) => 
                        <Grid item xs={12} sm={6}>
                            <AnyAcademic 
                                id={aa.id} 
                                anyInici={aa.anyInici} 
                                anyFi={aa.anyFi}
                                onEditAnyAcademic={this.openActualitzarFormAnyAcademic.bind(this)}
                                onEliminarAnyAcademic={this.openDialogBorrarAnyAcademic.bind(this)}
                            />
                        </Grid>
                    )}
                    </Grid>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                <Button onClick={this.handleFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button>
                <FormulariCrearAnyAcademic 
                    open={this.state.formulariCrearAnyAcademicObert}
                    handleClose={this.handleCloseFormulari.bind(this)}
                    onCreateAnyAcademic={this.handleCrearAnyAcademic.bind(this)}
                    anyAcademic={this.state.anyAcademicSeleccionat}
                    onUpdateAnyAcademic={this.handleActualitzarAnyAcademic.bind(this)}
                />
                <AlertDialog 
                    open={this.state.alertDialogObert}
                    titol={this.state.titolAlertDialog}
                    missatge={this.state.textAlertDialog}
                    onCloseDialog={this.tancarAlertDialog.bind(this)}
                    confirmarAccio={this.borrarAnyAcademic.bind(this)}
                />
                <Notificacio 
                    open={this.state.mostrarNotificacio}
                    missatge={this.state.titolNotificacio}
                    onCloseNotificacio={this.tancarNotificacio.bind(this)}
                />
            </div>
         );
    }
}

AnysAcademics.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AnysAcademics);