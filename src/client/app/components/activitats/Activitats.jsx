import React from 'react';
import TaulaAlumnes from '../alumnes/TaulaAlumnes.jsx';
import Notificacio from '../notificacions/Notificacio.jsx';
import AlertDialog from '../dialogs/AlertDialog.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import TitolHeaderService from '../../services/TitolHeaderService.jsx';
import Grid from 'material-ui/Grid';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
  } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FormulariActivitat from './FormulariActivitat.jsx';
import IconaEditar from '../iconaEditar/IconaEditar.jsx';
import Utils from '../../utils.jsx';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 7,
        right: theme.spacing.unit * 3,
    },
});

class Activitats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mostrarNotificacio: false,
            alertaOberta: false,
            missatge: "Activitat creada satisfactoriament",
            expanded: null,
            activitats: [],
            activitatSeleccionada: undefined,
            formulariObert: false,
            formulariModificar: false,
            alumnes: []
        };
        this.Auth = new AuthService();
        this.utils = new Utils();
    }

    componentWillMount () {
        this.getActivitats();
        this.getAlumnes(function(context) {
            context.getQualificacions(context);
        });
    }
    componentWillReceiveProps(nextProps) {
        this.getActivitats();
        this.getAlumnes(function(context) {
            context.getQualificacions(context);
        });
    }
    
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    openEditarActivitat = index => (event, expanded) => {
        this.setState({
            activitatSeleccionada: this.state.activitats[index],
            formulariObert: true,
            formulariModificar: true,
        });
        event.stopPropagation();
    };

    onProcessarFormulari (activitat, idActivitat) {
        if(activitat && activitat.nom !== "" && (!activitat.avaluable || activitat.ponderacio !== 0)) {
            if(idActivitat && idActivitat === this.state.activitatSeleccionada.id) {
                activitat.id = idActivitat;
                if(this.totalPonderacioCorrecte(activitat)) {
                    this.putActivitat(activitat);
                } else {
                    this.setState({
                        formulariObert: false,
                        alertaOberta: true,
                        activitatSeleccionada: undefined
                    });
                }
            } else {
                if(this.totalPonderacioCorrecte(activitat)) {
                    this.postActivitat(activitat);
                } else {
                    this.setState({
                        formulariObert: false,
                        alertaOberta: true,
                        activitatSeleccionada: undefined
                    });
                }
            }
        }
    }

    onClickTancarFormulari () {
        this.setState({formulariObert: false, activitatSeleccionada: undefined});
    }

    obrirFormulari () {
        this.setState({formulariObert: true});
    }

    getActivitats () {
        let url = config.apiEndpoint + '/activitats/';
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
        }).then((activitats) => {
            let activitatsFiltrats = activitats.filter((activitat) => activitat.trimestre == this.props.semestre);
            this.setState({
                activitats: activitatsFiltrats,
                expanded: null
            });
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    postActivitat (activitat) {
        let url = config.apiEndpoint + '/activitats/'; 
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(activitat)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((activitat) => {
            if(activitat) {
                this.setState({
                    activitats: this.state.activitats.concat([activitat]),
                    formulariObert: false,
                    activitatSeleccionada: undefined,
                    missatge: "Activitat creada satisfactoriament",
                    mostrarNotificacio: true
                });
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    putActivitat (activitat) {
        let url = config.apiEndpoint + '/activitats/' + this.state.activitatSeleccionada.id + "/";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(activitat)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((activitat) => {
            if(activitat) {
                let index = this.utils.getIndexElement(this.state.activitats, "id", activitat);
                let nousActivitats = this.state.activitats;
                nousActivitats[index] = activitat;
                this.setState({
                    activitats: nousActivitats,
                    formulariObert: false,
                    activitatSeleccionada: undefined,
                    formulariModificar: false,
                    missatge: "Activitat modificada satisfactoriament",
                    mostrarNotificacio: true
                });
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    getAlumnes (callback) {
        let url = config.apiEndpoint + '/alumnes/';
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
        }).then((alumnes) => {
            let alumnesFiltrats = alumnes.filter((alumne) => alumne.centre == this.props.centre && alumne.grup == this.props.grup);
            this.setState({
                alumnes: alumnesFiltrats,
            });
            callback && callback(this);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    getQualificacions (context) {
        let _this = context ? context : this;
        let url = config.apiEndpoint + '/qualificacions/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': _this.Auth.getToken()
            }
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 401) {
                _this.props.history.replace('/login');
            }
        }).then((qualificacions) => {
            let alumnes = _this.state.alumnes;
            for(let al in _this.state.alumnes) {
                let alumne = _this.state.alumnes[al];
                let qualificacionsFiltrades = qualificacions.filter((qualificacio) => qualificacio.alumne === alumne.id);
                alumnes[al].qualificacions = qualificacionsFiltrades ? qualificacionsFiltrades : [];
            }
            _this.setState({
                alumnes: alumnes,
            });
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                _this.props.history.replace('/login');
            }
        });
    }

    totalPonderacioCorrecte (activitat_post) {
        let totalPonderacio = 0;
        for(let key in this.state.activitats) {
            let activitat = this.state.activitats[key];
            if(activitat.avaluable && activitat.id !== activitat_post.id) {
                totalPonderacio += activitat.ponderacio;
            }
        }
        if(activitat_post) {
            totalPonderacio += activitat_post.ponderacio;
        }
        return totalPonderacio <= 100;
    }

    tancarNotificacio () {
        this.setState({
            mostrarNotificacio: false
        });
    }

    tancarAlertDialog () {
        this.setState({
            alertaOberta: false
        });
    }
    
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
    
        return (
          <div className={classes.root}>
            {this.state.activitats.map((a, index) => {
                return(
                <ExpansionPanel expanded={expanded === index} onChange={this.handleChange(index)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography className={classes.heading}><b>{a.nom}</b>{a.avaluable && "  |  " + "Ponderació: " + a.ponderacio + " %" }</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <div style={{right: 0}} onClick={this.openEditarActivitat(index)}><IconaEditar /></div>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {this.state.alumnes.length > 0 && 
                    <TaulaAlumnes alumnes={this.state.alumnes} activitat={a}/>
                    }
                    {this.state.alumnes.length <= 0 && 
                    <Typography className={classes.heading}>No hi ha alumnes matriculats</Typography>
                    }
                </ExpansionPanelDetails>
                </ExpansionPanel>
                );
            })}
            <FormulariActivitat 
                activitat={this.state.activitatSeleccionada}
                open={this.state.formulariObert}
                onClickTancarFormulari={this.onClickTancarFormulari.bind(this)}
                onProcessarFormulari={this.onProcessarFormulari.bind(this)}
                grup={this.props.grup}
                centre={this.props.centre}
                semestre={1}
                modeModificar={this.state.formulariModificar}
            />
            <Notificacio 
                open={this.state.mostrarNotificacio}
                missatge={this.state.missatge}
                onCloseNotificacio={this.tancarNotificacio.bind(this)}
            />
            <AlertDialog 
                missatge={"El total de ponderacions de les activitats avaluables no pot superar el 100 %"}
                open={this.state.alertaOberta}
                onCloseDialog={this.tancarAlertDialog.bind(this)}
                confirmarAccio={this.tancarAlertDialog.bind(this)}
            />
            <Button onClick={this.obrirFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                <AddIcon />
            </Button>
          </div>
        );
    }

}

Activitats.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Activitats);