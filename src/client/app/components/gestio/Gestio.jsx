import React from 'react';
import Assignatura from '../assignatura/Assignatura.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import TitolHeaderService from '../../services/TitolHeaderService.jsx';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Alumnes from '../alumnes/Alumnes.jsx';
import Activitats from '../activitats/Activitats.jsx';
import Accions from '../accionsGestio/Accions.jsx';
import AlertDialog from '../dialogs/AlertDialog.jsx';
import Notificacio from '../notificacions/Notificacio.jsx';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    }),
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
    },
    actionButton: {
        margin: theme.spacing.unit,
    },
});

class Gestio extends React.Component {

    constructor(props) {
        super(props);

        this.TITOL_SEMESTRE = "Semestre";
        this.TITOL_GRUP = "Grup";
        this.state = {
            valueTab: 0,
            assignatura: undefined,
            idCentre: this.props.match.params.idCentre,
            idAnyAcademic: this.props.match.params.idAnyAcademic,
            semestres: [],
            grups: [],
            grupSeleccionat: 0,
            semestreSeleccionat: 0,
            titolAlertDialog: "",
            urlObjecteEliminar: "",
            notificacioOberta: false,
            alertaObertaEliminar: false,
            mostrarNotificacio: false,
            titolNotificacio: ""
        };
        this.Auth = new AuthService();
        this.titolHeaderService = new TitolHeaderService();
    }

    componentWillMount () {
        this.getAssignatura(this, function(assignatura, context) {
            context.setState({assignatura: assignatura});
            context.getGrups(context, function(grups, context) {
                let grupsFiltrats = grups.filter((grup) => grup.centre == context.props.match.params.idCentre && grup.curs == context.state.assignatura.curs);
                context.setState({grups: grupsFiltrats});
                if(grupsFiltrats && grupsFiltrats.length > 0) {
                    context.setState({grupSeleccionat: grupsFiltrats[0].id});
                }
            });
            context.getTrimestres(context, function(trimestres, context) {
                let semestresFiltrats = trimestres.filter((trimestre) => trimestre.assignatura == context.state.assignatura.id);
                context.setState({semestres: semestresFiltrats});
                if(semestresFiltrats && semestresFiltrats.length > 0) {
                    context.setState({semestreSeleccionat: semestresFiltrats[0].id});
                }
            });
        });
    }

    componentDidMount () {
        
    }

    getAssignatura(context, callback) {
        let url = config.apiEndpoint + '/assignatures/' + this.props.match.params.idAssignatura + '/';
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
        }).then((assignatura) => {
            if(assignatura) callback(assignatura, this);
            else this.props.history.replace('/notFound');
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    getGrups(context, callback) {
        let url = config.apiEndpoint + '/grups/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.Auth.getToken()
            }
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                context.props.history.replace('/login');
            }
        }).then((grups) => {
            if(grups) callback(grups, context);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                context.props.history.replace('/login');
            }
        });
    }

    gestionarGrups(context, objecte, callback) {
        let id = "";
        if(objecte.id) {
            id = objecte.id + "/";
        }
        let url = config.apiEndpoint + '/grups/' + id;
        fetch(url, {
            method: objecte.id ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.Auth.getToken()
            },
            body: JSON.stringify(objecte)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                context.props.history.replace('/login');
            }
        }).then((grup) => {
            if(grup) callback(grup, context);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                context.props.history.replace('/login');
            }
        });
    }

    getTrimestres(context, callback) {
        let url = config.apiEndpoint + '/trimestres/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.Auth.getToken()
            }
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                context.props.history.replace('/login');
            }
        }).then((trimestres) => {
            if(trimestres) callback(trimestres, context);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                context.props.history.replace('/login');
            }
        });
    }

    gestionarTrimestres(context, objecte, callback) {
        let id = "";
        if(objecte.id) {
            id = objecte.id + "/";
        }
        if(!objecte.assignatura) objecte.assignatura = this.state.assignatura.id;
        let url = config.apiEndpoint + '/trimestres/' + id;
        fetch(url, {
            method: objecte.id ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.Auth.getToken()
            },
            body: JSON.stringify(objecte)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                context.props.history.replace('/login');
            }
        }).then((trimestre) => {
            if(trimestre) callback(trimestre, context);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                context.props.history.replace('/login');
            }
        });
    }

    onChangeGrup = event => {
        this.setState({ grupSeleccionat: event.target.value });
    };

    onChangeSemestre = event => {
        this.setState({ semestreSeleccionat: event.target.value });
    };

    handleChangeTab = (event, value) => {
        this.setState({ valueTab: value });
    };

    tancarNotificacio () {
        this.setState({mostrarNotificacio: false });
    }

    processarGrupsSemestres (objecte, titol) {
        if(titol === this.TITOL_SEMESTRE) {
            if(!objecte.assignatura) {
                objecte.assignatura = this.state.assignatura.id;
            }
            this.gestionarTrimestres(this, objecte, function (semestre, context) {
                if(objecte.id) {
                    let semestres = context.state.semestres;
                    semestres.map(function(s) {
                        if(objecte.id === s.id) {
                            s.nom = semestre.nom;
                            return;
                        }
                    });
                    context.setState({
                        semestres: semestres,
                        titolNotificacio: "Semestre editat satisfactoriament",
                        mostrarNotificacio: true
                    });
                } else {
                    context.setState({
                        semestres: context.state.semestres.concat([semestre]),
                        titolNotificacio: "Semestre creat satisfactoriament",
                        mostrarNotificacio: true
                    });
                }
            });
        } else if (titol === this.TITOL_GRUP) {
            if(!objecte.curs) {
                objecte.curs = this.state.assignatura.curs;
            }
            if(!objecte.centre) {
                objecte.centre = this.state.idCentre;
            }
            this.gestionarGrups(this, objecte, function (grup, context) {
                if(objecte.id) {
                    let grups = context.state.grups;
                    grups.map(function(g) {
                        if(objecte.id === g.id) {
                            g.nom = grup.nom;
                            return;
                        }
                    });
                    context.setState({
                        grups: grups,
                        titolNotificacio: "Grup editat satisfactoriament",
                        mostrarNotificacio: true
                    });
                } else {
                    context.setState({
                        grups: context.state.grups.concat([grup]),
                        titolNotificacio: "Grup creat satisfactoriament",
                        mostrarNotificacio: true
                    });
                }
            });
        }
    }

    peticioElimnarGrupSemestre(objecte, urlParam, context, callback) {
        let url = config.apiEndpoint + '/' + urlParam + '/' + objecte.id + '/';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.Auth.getToken()
            }
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                context.props.history.replace('/login');
            }
        }).then((objecte) => {
            callback(context);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                context.props.history.replace('/login');
            }
        });
    }

    eliminarGrupSemestre (objecte, titol) {
        if(titol === this.TITOL_SEMESTRE) {
            this.setState({
                alertaObertaEliminar: true,
                titolAlertDialog: "Segur que vols eliminar el semestre seleccionat?",
                urlObjecteEliminar: "trimestres"
            });
        } else if (titol === this.TITOL_GRUP) {
            this.setState({
                alertaObertaEliminar: true,
                titolAlertDialog: "Segur que vols eliminar el grup seleccionat?",
                urlObjecteEliminar: "grups"
            });
        }
    }

    tancarAlertDialogEliminar () {
        this.setState({
            alertaObertaEliminar: false
        });
    }

    accioEliminar () {
        var objecte = undefined;    
        if(this.state.urlObjecteEliminar === "trimestres") {
            objecte = this.state.semestres.find((element) => element.id == this.state.semestreSeleccionat);
            this.peticioElimnarGrupSemestre(objecte, "trimestres", this, function(context) {
                let semestres = context.state.semestres.filter((semestre) => semestre.id !== objecte.id);
                context.setState({
                    semestres: semestres,
                    alertaObertaEliminar: false,
                    titolAlertDialog: "",
                    urlObjecteEliminar: "",
                    semestreSeleccionat: context.state.semestres.length > 0 ? context.state.semestres[0].id : 0,
                    titolNotificacio: "Semestre eliminat satisfactoriament",
                    mostrarNotificacio: true
                });
            });
        } else if (this.state.urlObjecteEliminar === "grups") {
            objecte = this.state.grups.find((element) => element.id == this.state.grupSeleccionat);
            this.peticioElimnarGrupSemestre(objecte, "grups", this, function(context) {
                let grups = context.state.grups.filter((grup) => grup.id !== objecte.id);
                context.setState({
                    grups: grups,
                    alertaObertaEliminar: false,
                    titolAlertDialog: "",
                    urlObjecteEliminar: "",
                    grupSeleccionat: context.state.grups.length > 0 ? context.state.grups[0].id : 0,
                    titolNotificacio: "Grup eliminat satisfactoriament",
                    mostrarNotificacio: true
                });
            });
        }
    }

    tePerDefecte(objectes) {
        return objectes.length < 1 || (objectes && objectes.length === 1 && objectes[0] && objectes[0].nom && objectes[0].nom.toLowerCase() === "default");
    }

    render () {
        const { classes } = this.props;
        return(
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: 'center', margin: '2px'}}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    id="select-semestre-native"
                                    select
                                    label="Semestres"
                                    className={classes.textField}
                                    value={this.state.semestreSeleccionat}
                                    onChange={this.onChangeSemestre}
                                    SelectProps={{
                                        MenuProps: {
                                        native: "false",
                                        className: classes.menu,
                                        },
                                    }}
                                    helperText="Selecciona el semestre"
                                    margin="normal"
                                    >
                                    {this.state.semestres.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                        {option.nom}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Accions 
                                    objecte={this.state.semestres.filter((semestre) => semestre.id === this.state.semestreSeleccionat)[0]}
                                    titolAccio={this.TITOL_SEMESTRE}
                                    precessarAccio={this.processarGrupsSemestres.bind(this)}
                                    edicio={!this.tePerDefecte(this.state.semestres)}
                                    processarAccioEliminar={this.eliminarGrupSemestre.bind(this)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                id="select-grup-native"
                                select
                                label="Grups"
                                className={classes.textField}
                                value={this.state.grupSeleccionat}
                                onChange={this.onChangeGrup}
                                SelectProps={{
                                    MenuProps: {
                                    native: "false",
                                    className: classes.menu,
                                    },
                                }}
                                helperText="Selecciona el grup"
                                margin="normal"
                                >
                                {this.state.grups.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.nom}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Accions 
                                objecte={this.state.grups.filter((grup) => grup.id === this.state.grupSeleccionat)[0]}
                                titolAccio={this.TITOL_GRUP}
                                precessarAccio={this.processarGrupsSemestres.bind(this)}
                                edicio={!this.tePerDefecte(this.state.grups)}
                                processarAccioEliminar={this.eliminarGrupSemestre.bind(this)}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={true} sm={true} md={1} lg={1} />
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Paper className={classes.paper}>
                        {this.state.valueTab == 0 &&
                            <Activitats grup={this.state.grupSeleccionat} centre={this.state.idCentre} semestre={this.state.semestreSeleccionat} semestres={this.state.semestres}/>
                        }
                        {this.state.valueTab == 1 &&
                            <Alumnes grup={this.state.grupSeleccionat} grups={this.state.grups} centre={this.state.idCentre} semestre={this.state.semestreSeleccionat}/>
                        }
                        </Paper>
                    </Grid>
                    <Grid item xs={true} sm={true} md={1} lg={1} />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper style={{ width: '100%', position: 'fixed', bottom: '0%' }}>
                            <Tabs
                            value={this.state.valueTab}
                            onChange={this.handleChangeTab}
                            fullWidth
                            indicatorColor="primary"
                            textColor="primary"
                            >
                            <Tab 
                                style={{ maxWidth: '100%' }} 
                                label={"Activitats"} 
                            />
                            <Tab 
                                style={{ maxWidth: '100%' }} 
                                label={"Alumnes"} 
                            />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                <AlertDialog 
                    missatge={this.state.titolAlertDialog}
                    open={this.state.alertaObertaEliminar}
                    onCloseDialog={this.tancarAlertDialogEliminar.bind(this)}
                    confirmarAccio={this.accioEliminar.bind(this)}
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

Gestio.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Gestio);