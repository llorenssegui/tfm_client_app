import React from 'react';
import Assignatura from '../assignatura/Assignatura.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import FormulariCrearAssignatura from './FormulariCrearAssignatura.jsx';
import Notificacio from '../notificacions/Notificacio.jsx';
import AlertDialog from '../dialogs/AlertDialog.jsx';
import config from '../../../../../config.js';
import Utils from '../../utils.jsx';
import FormulariAssignatura from './FormulariAssignatura.jsx';

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
    container: {
        
    },
});

class Assignatures extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idAnyAcademic: this.props.match.params.idAnyAcademic,
            assignatures: [],
            cursos: [],
            assignaturaSeleccionada: undefined,
            formulariEditarAssignaturaObert: false,
            alertDialogObert: false,
            textAlertDialog: "Segur que vols eliminar l'assignatura seleccionada?",
            titolAlertDialog: "",
            formulariCrearAssignaturaObert: false
        };
        this.utils = new Utils();
    }

    handleFormulari() {
        this.setState({ formulariEditarAssignaturaObert: true, assignaturaSeleccionada: undefined });
    }
    
    handleFormulariCrear() {
        this.setState({ formulariCrearAssignaturaObert: true });
    }

    handleCloseFormulari() {
        this.setState({formulariEditarAssignaturaObert: false});
    }

    handleCloseFormulariCrear() {
        this.setState({formulariCrearAssignaturaObert: false});
    }

    openDialogBorrarAssignatura(assignatura) {
        this.setState({alertDialogObert: true, assignaturaSeleccionada: assignatura, titolAlertDialog: assignatura.nom});
    }

    handleCrearAssignatura(assignatura, avaluacions, grups) {
        this.peticioCrearAssignatura(assignatura, avaluacions, grups, function(assignatura, avaluacions, grups, context) {
            let id_curs = assignatura.curs;
            let id_assignatura = assignatura.id;
            for(let i = 0; i < grups.length; i++) {
                let grup = {
                    nom: grups[i].label,
                    curs: id_curs
                };
                context.peticioCrearGrup(grup, function(grup, context) {

                });
            }
            for(let i = 0; i < avaluacions.length; i++) {
                let avaluacio = {
                    nom: avaluacions[i].label,
                    assignatura: id_assignatura
                };
                context.peticioCrearAvaluacio(avaluacio, function(avaluacio, context) {
                    
                });
            }
            context.setState({formulariCrearAssignaturaObert:false, 
                titolNotificacio: "Assignatura creada satisfactoriament", 
                mostrarNotificacio:true,
                assignatures: this.state.assignatures.concat([assignatura])
            });
        });
    }

    peticioCrearAssignatura(assignatura, avaluacions, grups, callback) {
        let url = config.apiEndpoint + '/assignatures/';
        if(!assignatura.anyAcademic) assignatura.anyAcademic = this.state.idAnyAcademic;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignatura)
        }).then(function(response) {  
            return response.json();
        }).then((assignaturaN) => {
            console.log(avaluacions);
            callback(assignaturaN, avaluacions, grups, this);
        });
    }

    peticioCrearGrup(grup, callback) {
        let url = config.apiEndpoint + '/grups/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(grup)
        }).then(function(response) {  
            return response.json();
        }).then((grup) => {
            callback(grup, this);
        });
    }

    peticioCrearAvaluacio(avaluacio, callback) {
        let url = config.apiEndpoint + '/trimestres/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaluacio)
        }).then(function(response) {  
            return response.json();
        }).then((avaluacio) => {
            callback(avaluacio, this);
        });
    }

    handleActualitzarAssignatura(assignatura) {
        let url = config.apiEndpoint + '/assignatures/' + assignatura.id + "/";
        if(!assignatura.anyAcademic) assignatura.anyAcademic = this.state.idAnyAcademic;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignatura)
        }).then(function(response) {  
            return response.json();
        }).then((assignatura) => {
            this.setState({formulariEditarAssignaturaObert: false, 
                assignaturaSeleccionada: undefined,
                titolNotificacio: "Assignatura modificada satisfactoriament",
                mostrarNotificacio: true
            });
            let index = this.utils.getIndexElement(this.state.assignatures, "id", assignatura);
            if(index !== -1) {
                let novesAssignatures = this.state.assignatures;
                novesAssignatures[index] = assignatura;
                this.setState({
                    assignatures: novesAssignatures
                });
            }
        });
    }

    openActualitzarFormAssignatura(assignatura) {
        this.setState({formulariEditarAssignaturaObert: true, assignaturaSeleccionada: assignatura});
    }

    tancarAlertDialog() {
        this.setState({alertDialogObert: false, assignaturaSeleccionada: undefined});
    }

    borrarAssignatura(assignatura) {
        let url = config.apiEndpoint + '/assignatures/' + this.state.assignaturaSeleccionada.id + '/';
        console.log(this.state.assignaturaSeleccionada);
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((assignatura) => {
            let novesAssignatures = this.state.assignatures.filter(a => a.id !== this.state.assignaturaSeleccionada.id);
            this.setState({alertDialogObert: false, 
                assignaturaSeleccionada: undefined,
                titolNotificacio: "Assignatura eliminada satisfactoriament",
                mostrarNotificacio: true,
                assignatures: novesAssignatures
            });
        });
    }

    tancarNotificacio () {
        this.setState({mostrarNotificacio: false, anyAcademicSeleccionat: undefined});
    }

    obtenirCurssos(callback) {
        let url = config.apiEndpoint + '/cursos/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((cursos) => {
            this.setState({cursos: cursos});
            if(callback) callback(this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 404) {
                this.props.history.replace('/notFound');
            }
        });
    }

    obtenirAssignatures(callback) {
        let url = config.apiEndpoint + '/assignatures/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((assignatures) => {
            let filteredassignatures = assignatures.filter((assignatura) => assignatura.anyAcademic == this.state.idAnyAcademic);
            if(!filteredassignatures || filteredassignatures.length === 0) this.props.history.replace('/notFound');
            this.setState({ assignatures: filteredassignatures});
            if(callback) callback(this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 404) {
                this.props.history.replace('/notFound');
            }
        });
    }

    obtenirAnyAcademic(callback) {
        let url = config.apiEndpoint + '/anysacademics/' + this.state.idAnyAcademic + '/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((assignatura) => {
            if(!assignatura || assignatura.centre !== Number(this.props.match.params.idCentre)) { 
                this.props.history.replace('/notFound');
            }
            if(callback) callback(this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 404) {
                this.props.history.replace('/notFound');
            }
        });
    }

    obtenirCurs(idCurs) {
        let curs = this.state.cursos.filter((curs) => curs.id == idCurs)[0];
        return curs;
    }

    obtenirLlistatCursos() {
        return this.state.cursos;
    }

    componentDidMount() {
        this.obtenirAnyAcademic(function(context){
            context.obtenirCurssos(function (context) {
                context.obtenirAssignatures();
            });
        });     
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container>
                <Grid item xs={12} sm={2} md={2}></Grid>
                <Grid item xs={12} sm={8} md={8}>
                <Grid container spacing={24}>
                    {this.state.assignatures.map((a, index) => {
                        return(
                        <Grid item xs={12} sm={12} md={4}>
                            <Assignatura 
                                id={a.id}
                                posicio={index}
                                nom={a.nom}
                                curs={this.obtenirCurs(a.curs)}
                                onEditAssignatura={this.openActualitzarFormAssignatura.bind(this)}
                                onEliminarAssignatura={this.openDialogBorrarAssignatura.bind(this)}
                            />
                        </Grid>);
                    })}
                    <AlertDialog 
                        open={this.state.alertDialogObert}
                        titol={this.state.titolAlertDialog}
                        missatge={this.state.textAlertDialog}
                        onCloseDialog={this.tancarAlertDialog.bind(this)}
                        confirmarAccio={this.borrarAssignatura.bind(this)}
                    /> 
                    <FormulariCrearAssignatura
                        open={this.state.formulariEditarAssignaturaObert}
                        handleClose={this.handleCloseFormulari.bind(this)}
                        onCreateAssignatura={this.handleCrearAssignatura.bind(this)}
                        assignatura={this.state.assignaturaSeleccionada}
                        cursos={this.state.cursos}
                        onUpdateAssignatura={this.handleActualitzarAssignatura.bind(this)}
                    />
                    <FormulariAssignatura 
                        open={this.state.formulariCrearAssignaturaObert}
                        close={this.handleCloseFormulariCrear.bind(this)}
                        cursos={this.state.cursos}
                        onCreate={this.handleCrearAssignatura.bind(this)}
                    />
                    <Notificacio 
                        open={this.state.mostrarNotificacio}
                        missatge={this.state.titolNotificacio}
                        onCloseNotificacio={this.tancarNotificacio.bind(this)}
                    />       
                </Grid>
                </Grid>
                <Grid item xs={12} sm={2} md={2}></Grid>
                </Grid>
                <Button onClick={this.handleFormulariCrear.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button> 
            </div>
        );
    }

}

Assignatures.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Assignatures);