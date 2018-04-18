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
import AuthService from '../../services/AuthService.jsx';
import TitolHeaderService from '../../services/TitolHeaderService.jsx';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
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
        this.Auth = new AuthService();
        this.titolHeaderService = new TitolHeaderService();
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

    handleCrearAssignatura(assignatura, avaluacions) {
        this.peticioCrearAssignatura(assignatura, avaluacions, function(assignatura, avaluacions, context) {
            let id_curs = assignatura.curs;
            let id_assignatura = assignatura.id;
            for(let i = 0; i < avaluacions.length; i++) {
                let avaluacio = {
                    nom: avaluacions[i].label,
                    assignatura: id_assignatura
                };
                context.peticioCrearAvaluacio(avaluacio, function(avaluacio, context) {
                    
                });
            }
            context.peticioGETGrups(function(grups, context){
                let grupsFiltrats = grups.filter(g => g.curs === id_curs && g.centre === Number(context.props.match.params.idCentre));
                if(!grupsFiltrats || grupsFiltrats.length === 0) {
                    let grup = {
                        nom: 'Default',
                        curs: id_curs,
                        centre: Number(context.props.match.params.idCentre)
                    };
                    context.peticioCrearGrup(grup);
                }
            });
            context.setState({formulariCrearAssignaturaObert:false, 
                titolNotificacio: "Assignatura creada satisfactoriament", 
                mostrarNotificacio:true,
                assignatures: context.state.assignatures.concat([assignatura])
            });
        });
    }

    peticioCrearAssignatura(assignatura, avaluacions, callback) {
        let url = config.apiEndpoint + '/assignatures/';
        if(!assignatura.anyAcademic) assignatura.anyAcademic = this.state.idAnyAcademic;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(assignatura)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((assignaturaN) => {
            callback(assignatura, avaluacions, this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    peticioCrearGrup(grup, callback) {
        let url = config.apiEndpoint + '/grups/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(grup)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((grup) => {
            if(grup) callback(grup, this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    peticioGETGrups(callback) {
        let url = config.apiEndpoint + '/grups/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((grups) => {
            if(grups) callback(grups, this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    peticioCrearAvaluacio(avaluacio, callback) {
        let url = config.apiEndpoint + '/trimestres/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(avaluacio)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((avaluacio) => {
            if (avaluacio) callback(avaluacio, this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    handleActualitzarAssignatura(assignatura) {
        let url = config.apiEndpoint + '/assignatures/' + assignatura.id + "/";
        if(!assignatura.anyAcademic) assignatura.anyAcademic = this.state.idAnyAcademic;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(assignatura)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((assignatura) => {
            if(assignatura) {
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
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
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
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        }).then(response => {
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((assignatura) => {
                let novesAssignatures = this.state.assignatures.filter(a => a.id !== this.state.assignaturaSeleccionada.id);
                this.setState({alertDialogObert: false, 
                    assignaturaSeleccionada: undefined,
                    titolNotificacio: "Assignatura eliminada satisfactoriament",
                    mostrarNotificacio: true,
                    assignatures: novesAssignatures
                });
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    tancarNotificacio () {
        this.setState({mostrarNotificacio: false, anyAcademicSeleccionat: undefined});
    }

    obtenirCurssos(callback) {
        let url = config.apiEndpoint + '/cursos/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        })
        .then((response) => {
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        })
        .then((cursos) => {
            if(cursos) {
                this.setState({cursos: cursos});
                if(callback) callback(this);
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 404) {
                this.props.history.replace('/login');
            }
        });
    }

    obtenirAssignatures(callback) {
        let url = config.apiEndpoint + '/assignatures/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        })
        .then((response) => {
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        })
        .then((assignatures) => {
            if (assignatures) {
                let filteredassignatures = assignatures.filter((assignatura) => assignatura.anyAcademic == this.state.idAnyAcademic);
                this.setState({ assignatures: filteredassignatures});
                if(callback) callback(this);
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 404) {
                this.props.history.replace('/login');
            }
        });
    }

    obtenirAnyAcademic(callback) {
        let url = config.apiEndpoint + '/anysacademics/' + this.state.idAnyAcademic + '/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        })
        .then((response) => {
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        })
        .then((assignatura) => {
            if(callback) callback(this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 404) {
                this.props.history.replace('/login');
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
        this.titolHeaderService.setTitol("Assignatures: " + this.props.location.state.nomCentre);
        this.obtenirAnyAcademic(function(context){
            context.obtenirCurssos(function (context) {
                context.obtenirAssignatures();
            });
        });     
    }

    seleccionarAssignatura (assignatura) {
        this.props.history.push({
            pathname: this.state.idAnyAcademic + "/assignatura/" + assignatura.id,
            state: {assignatura: assignatura}
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container>
                <Grid item xs={12} lg={2}></Grid>
                <Grid item xs={12} lg={8}>
                <Grid container spacing={24}>
                    {this.state.assignatures.map((a, index) => {
                        return(
                        <Grid item xs={12} lg={4}>
                            <Assignatura 
                                id={a.id}
                                posicio={index}
                                nom={a.nom}
                                curs={this.obtenirCurs(a.curs)}
                                onEditAssignatura={this.openActualitzarFormAssignatura.bind(this)}
                                onEliminarAssignatura={this.openDialogBorrarAssignatura.bind(this)}
                                onSeleccionat={this.seleccionarAssignatura.bind(this)}
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
                <Grid item xs={12} lg={2}></Grid>
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