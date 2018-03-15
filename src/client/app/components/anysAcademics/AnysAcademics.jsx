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
        anyAcademicSeleccionat: undefined,
        centre: this.props.match.params.idCentre
    };

    constructor(props) {
        super(props);
        console.log(this.state);
    }

    handleFormulari (event) {
        this.setState({ formulariCrearAnyAcademicObert: true, anyAcademicSeleccionat: undefined });
    }

    handleCloseFormulari (event) {
        this.setState({ formulariCrearAnyAcademicObert: false });
    }

    handleCrearAnyAcademic (centre) {
        let url = config.apiEndpoint + '/anysacademics/';
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
                titolNotificacio: "Any academic creat satisfactoriament", 
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

    handleFormulari () {

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
                            <AnyAcademic anyInici={aa.anyInici} anyFi={aa.anyFi}/>
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
            </div>
         );
    }
}

AnysAcademics.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AnysAcademics);