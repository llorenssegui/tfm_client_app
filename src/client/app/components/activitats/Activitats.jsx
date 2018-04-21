import React from 'react';
import Assignatura from '../assignatura/Assignatura.jsx';
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
            expanded: null,
            activitats: [],
            activitatSeleccionada: undefined,
            formulariObert: false,
            formulariModificar: false
        };
        this.Auth = new AuthService();
        this.utils = new Utils();
    }

    componentWillMount () {
        this.getActivitats();
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
        if(activitat && activitat.nom !== "" && activitat.congnom_1 !== "" && activitat.congnom_2 !== "") {
            if(idActivitat && idActivitat === this.state.activitatSeleccionada.id) {
                this.putActivitat(activitat);
            } else {
                this.postActivitat(activitat);
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
            let activitatsFiltrats = activitats.filter((activitat) => activitat.centre == this.props.centre && activitat.grup == this.props.grup);
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
                    activitatSeleccionada: undefined
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
                    formulariModificar: false
                });
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
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
                            <Typography className={classes.heading}>{a.nom}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <div style={{right: 0}} onClick={this.openEditarActivitat(index)}><IconaEditar /></div>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    Aquí anirien les qualificacions de cada activitat
                    </Typography>
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
                modeModificar={this.state.formulariModificar}
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