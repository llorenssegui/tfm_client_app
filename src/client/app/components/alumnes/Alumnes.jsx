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
import FormulariAlumne from './FormulariAlumne.jsx';
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

class Alumnes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            alumnes: [],
            alumneSeleccionat: undefined,
            formulariObert: false
        };
        this.Auth = new AuthService();
        this.utils = new Utils();
    }

    componentWillMount () {
        this.getAlumnes();
    }
    
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    openEditarAlumne = index => (event, expanded) => {
        this.setState({
            alumneSeleccionat: this.state.alumnes[index],
            formulariObert: true,
        });
        event.stopPropagation();
    };

    onProcessarFormulari (alumne, idAlumne) {
        if(alumne && alumne.nom !== "" && alumne.congnom_1 !== "" && alumne.congnom_2 !== "") {
            if(idAlumne && idAlumne === this.state.alumneSeleccionat.id) {
                this.putAlumne(alumne);
            } else {
                this.postAlumne(alumne);
            }
        }
    }

    onClickTancarFormulari () {
        this.setState({formulariObert: false, alumneSeleccionat: undefined});
    }

    obrirFormulari () {
        this.setState({formulariObert: true});
    }

    getAlumnes () {
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
                expanded: null
            });
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    postAlumne (alumne) {
        let url = config.apiEndpoint + '/alumnes/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(alumne)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((alumne) => {
            if(alumne) {
                this.setState({
                    alumnes: this.state.alumnes.concat([alumne]),
                    formulariObert: false,
                    alumneSeleccionat: undefined
                });
            }
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    putAlumne (alumne) {
        let url = config.apiEndpoint + '/alumnes/' + this.state.alumneSeleccionat.id + "/";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(alumne)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((alumne) => {
            if(alumne) {
                let index = this.utils.getIndexElement(this.state.alumnes, "id", alumne);
                let nousAlumnes = this.state.alumnes;
                nousAlumnes[index] = alumne;
                this.setState({
                    alumnes: nousAlumnes,
                    formulariObert: false,
                    alumneSeleccionat: undefined
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
            {this.state.alumnes.map((a, index) => {
                return(
                <ExpansionPanel expanded={expanded === index} onChange={this.handleChange(index)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography className={classes.heading}>{a.nom} {a.congnom_1} {a.congnom_2}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <div style={{right: 0}} onClick={this.openEditarAlumne(index)}><IconaEditar /></div>
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
            <FormulariAlumne 
                alumne={this.state.alumneSeleccionat}
                open={this.state.formulariObert}
                onClickTancarFormulari={this.onClickTancarFormulari.bind(this)}
                onProcessarFormulari={this.onProcessarFormulari.bind(this)}
                grup={this.props.grup}
                centre={this.props.centre}
            />
            <Button onClick={this.obrirFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                <AddIcon />
            </Button>
          </div>
        );
    }

}

Alumnes.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Alumnes);