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
});

class Gestio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueTab: 0,
            assignatura: undefined,
            idCentre: this.props.match.params.idCentre,
            idAnyAcademic: this.props.match.params.idAnyAcademic,
            semestres: [],
            grups: [],
            grupSeleccionat: 0,
            semestreSeleccionat: 0
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

    onChangeGrup = event => {
        this.setState({ grupSeleccionat: event.target.value });
    };

    onChangeSemestre = event => {
        this.setState({ semestreSeleccionat: event.target.value });
    };

    handleChangeTab = (event, value) => {
        this.setState({ valueTab: value });
    };

    render () {
        const { classes } = this.props;
        return(
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
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
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={true} sm={true} md={1} lg={1} />
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Paper className={classes.paper}>
                        {this.state.valueTab == 0 &&
                            <Activitats grup={this.state.grupSeleccionat} centre={this.state.idCentre}/>
                        }
                        {this.state.valueTab == 1 &&
                            <Alumnes grup={this.state.grupSeleccionat} centre={this.state.idCentre}/>
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
            </div>
        );
    }

}

Gestio.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Gestio);