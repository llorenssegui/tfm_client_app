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

class Assignatures extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idAnyAcademic: this.props.match.params.idAnyAcademic,
            assignatures: [],
            cursos: [],
            assignaturaSeleccionada: undefined,
            formulariCrearAssignaturaObert: false,
            alertDialogObert: false,
            textAlertDialog: "Segur que vols eliminar l'assignatura seleccionada?",
            titolAlertDialog: ""
        };
    }

    handleFormulari() {
        this.setState({ formulariCrearAssignaturaObert: true, assignaturaSeleccionada: undefined });
    }

    handleCloseFormulari() {
        this.setState({formulariCrearAssignaturaObert: false});
    }

    handleCrearAssignatura(assignatura) {
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
        }).then((assignatura) => {
            this.setState({formulariCrearAssignaturaObert:false, 
                titolNotificacio: "Assignatura creada satisfactoriament", 
                mostrarNotificacio:true,
                assignatures: this.state.assignatures.concat([assignatura])
            });
        });
    }

    handleActualitzarAssignatura() {
        let url = config.apiEndpoint + '/assignatures/';
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
            this.setState({formulariCrearAssignaturaObert:false, 
                titolNotificacio: "Assignatura actualitzada satisfactoriament", 
                mostrarNotificacio:true,
                assignatures: this.state.assignatures.concat([assignatura])
            });
        });
    }

    openActualitzarFormAssignatura(assignatura) {
        this.setState({formulariCrearAssignaturaObert: true, assignaturaSeleccionada: assignatura});
    }

    tancarAlertDialog() {
        this.setState({alertDialogObert: false, assignaturaSeleccionada: undefined});
    }

    borrarAssignatura() {
        let url = config.apiEndpoint + '/assignatures/' + this.state.assignaturaSeleccionada.id + '/';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((anyAcademic) => {
            let index = this.utils.getIndexElement(this.state.assignatures, "id", this.state.assignaturaSeleccionada);
            this.setState({alertDialogObert: false, 
                assignaturaSeleccionada: undefined,
                titolNotificacio: "Assignatura eliminada satisfactoriament",
                mostrarNotificacio: true
            });
            let novesAssignatures = this.state.assignatures;
            if(index !== -1) {
                this.setState({
                    assignatures: novesAssignatures.splice(index, 1)
                });
            }
        });
    }

    tancarNotificacio () {
        this.setState({alertDialogObert: false, anyAcademicSeleccionat: undefined});
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

    obtenirCurs(idCurs) {
        let curs = this.state.cursos.filter((curs) => curs.id == idCurs)[0];
        return curs;
    }

    obtenirLlistatCursos() {
        return this.state.cursos;
    }

    componentDidMount() {
        this.obtenirCurssos(function (context) {
            context.obtenirAssignatures();
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.state.assignatures.map((a, index) => {
                        return(
                        <Grid item xs={12} sm={12} md={6}>
                            <Assignatura 
                                id={a.id}
                                posicio={index}
                                nom={a.nom}
                                curs={this.obtenirCurs(a.curs)}
                                onEditAssignatura={this.openActualitzarFormAssignatura.bind(this)}
                            />
                        </Grid>);
                    })}
                    <Button onClick={this.handleFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button> 
                    <AlertDialog 
                        open={this.state.alertDialogObert}
                        titol={this.state.titolAlertDialog}
                        missatge={this.state.textAlertDialog}
                        onCloseDialog={this.tancarAlertDialog.bind(this)}
                        confirmarAccio={this.borrarAssignatura.bind(this)}
                    /> 
                    <FormulariCrearAssignatura
                        open={this.state.formulariCrearAssignaturaObert}
                        handleClose={this.handleCloseFormulari.bind(this)}
                        onCreateAssignatura={this.handleCrearAssignatura.bind(this)}
                        assignatura={this.state.assignaturaSeleccionada}
                        cursos={this.state.cursos}
                        onUpdateAssignatura={this.handleActualitzarAssignatura.bind(this)}
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

Assignatures.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Assignatures);