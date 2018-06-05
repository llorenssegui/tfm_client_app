import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import TitolHeaderService from '../../services/TitolHeaderService.jsx';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Divider from 'material-ui/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Notificacio from '../notificacions/Notificacio.jsx';

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginBottom: theme.spacing.unit * 3,
    }),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    details: {
        alignItems: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

class Perfil extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            nom: "",
            congnom_1: "",
            congnom_2: "",
            data_naixement: "",
            password_actual: "",
            password_nova: "",
            password_nova_2: "",
            validForm: {},
            validFormPassword: {
                password_nova_2: false,
                password_nova: false,
                password_actual: false
            },
            titolNotificacio: "Dades personals actualitzades",
            mostrarNotificacio: false
        };
        this.propsNotValidate = [
            "password_actual", 
            "password_nova", 
            "password_nova_2",
            "validForm",
            "missatgeEmailExistent",
            "validFormPassword",
            "mostrarNotificacio",
        ];
        this.Auth = new AuthService();
        this.titolHeaderService = new TitolHeaderService();
    }

    componentWillMount () {
        if(!this.Auth.loggedIn()) {
            this.props.history.replace('/login');
        }
        let validFormAux = {};
        for (let key in this.state) {
            if(this.propsNotValidate.indexOf("" + key) == -1) {   
                validFormAux[key] = false;
            }
        }
        this.getProfessor();
        this.setState({validForm: validFormAux});
    }

    componentDidMount () {
        this.titolHeaderService.setTitol("Teacher Support: Perfil");
    }

    handleChange = name => event => {
        let validForm = this.state.validForm;
        if(event.target.value === "") validForm[name] = true;
        else validForm[name] = false;
        this.setState({
          [name]: event.target.value,
          validForm: validForm
        });
    }

    handleChangePassword = name => event => {
        let validFormPassword = this.state.validFormPassword;
        if(event.target.value === "") validFormPassword[name] = true;
        else validFormPassword[name] = false;
        this.setState({
          [name]: event.target.value,
          validFormPassword: validFormPassword
        });
    }

    isErrror (stateAttr) {
        return true;
    }

    tancarDialog () {
        this.setState({
            mostrarNotificacio: false
        });
    }

    formIsValid() {
        let validFormAux = {};
        let isValid = true;
        for (let key in this.state) {
            if(this.propsNotValidate.indexOf("" + key) == -1 && (!this.state[key] || this.state[key] === "")) {   
                validFormAux[key] = false;
                isValid = false;
            }
        }
        this.setState({validForm: validFormAux});
        return isValid;
    }

    formPasswordIsValid() {
        let validFormAux = {};
        let isValid = true;
        for (let key in this.state) {
            if(this.state.validFormPassword.hasOwnProperty(key) && (!this.state[key] || this.state[key] === "")) {   
                validFormAux[key] = true;
                isValid = false;
            }
        }
        this.setState({validFormPassword: validFormAux});
        return isValid;
    }

    tancarNotificacio () {
        this.setState({
            mostrarNotificacio: false
        });
    }

    getProfessor() {
        if(this.Auth.loggedIn()) {
            let url = config.apiEndpoint + '/professors/' + this.Auth.getProfile().id + '/';
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
            }).then((professor) => {
                this.setState({
                    nom: professor.nom,
                    congnom_1: professor.congnom_1,
                    congnom_2: professor.congnom_2,
                    data_naixement: professor.data_naixement
                });
            }).catch(function(error) {
                const status = error.response ? error.response.status : 500
                if (status === 401) {
                    this.props.history.replace('/login');
                }
            });
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        var that = this;
        let url = config.apiEndpoint + '/professors/' + this.Auth.getProfile().id + '/';
        if(this.formIsValid() && this.state.password === this.state.password_2) {
            let professor = {
                nom: this.state.nom,
                congnom_1: this.state.congnom_1,
                congnom_2: this.state.congnom_2,
                data_naixement: this.state.data_naixement,
            };
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.Auth.getToken()
                },
                body: JSON.stringify(professor)
            }).then(function(response) {  
                if(response.status === 200 || response.status === 201) {
                    return response.json();
                } else if (response.status === 401) {
                    this.props.history.replace('/login');
                }
            }).then((professor) => {
                this.setState({
                    nom: professor.nom,
                    congnom_1: professor.congnom_1,
                    congnom_2: professor.congnom_2,
                    data_naixement: professor.data_naixement,
                    titolNotificacio: "Dades personals actualitzades",
                    mostrarNotificacio: true,
                });
            }).catch(function(error) {
                const status = error.response ? error.response.status : 500
                if (status === 401) {
                    this.props.history.replace('/login');
                }
            });
        }
    };

    handleActualitzarContrassenya = event => {
        if(this.formPasswordIsValid() && this.state.password_nova === this.state.password_nova_2) {
            let url = config.apiEndpoint + '/cambiarcontrassenya/' + this.Auth.getProfile().id + '/';
            let p = {
                email: this.Auth.getProfile().email,
                password_actual: this.state.password_actual,
                password_nova: this.state.password_nova
            };
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.Auth.getToken()
                },
                body: JSON.stringify(p)
            }).then(function(response) {  
                if(response.status === 200 || response.status === 201) {
                    return response.json();
                } else if (response.status === 401) {
                    this.props.history.replace('/login');
                }
            }).then((professor) => {
                this.setState({
                    password_nova: "",
                    password_nova_2: "",
                    password_actual: "",
                    titolNotificacio: "Contrassenya actualitzada",
                    mostrarNotificacio: true,
                });
            }).catch(function(error) {
                const status = error.response ? error.response.status : 500
                if (status === 401) {
                    this.props.history.replace('/login');
                }
            });
        } else {

        }
    };

    render() {
        const { classes } = this.props;
        return(
            <form onSubmit={this.handleFormSubmit} className={classes.root}>
                <Grid container>
                    <Grid item xs={true} md={2}/>
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.root}>
                            <Grid container spacing={40}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="nom"
                                        type="text"
                                        label="Nom"
                                        className={classes.textField}
                                        value={this.state.nom}
                                        onChange={this.handleChange('nom')}
                                        margin="normal"
                                        
                                        error={this.state.validForm.nom}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        id="congnom_1"
                                        type="text"
                                        label="Primer congnom"
                                        className={classes.textField}
                                        value={this.state.congnom_1}
                                        onChange={this.handleChange('congnom_1')}
                                        
                                        error={this.state.validForm.congnom_1}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        id="congnom_2"
                                        type="text"
                                        label="Segon congnom"
                                        className={classes.textField}
                                        value={this.state.congnom_2}
                                        onChange={this.handleChange('congnom_2')}
                                        
                                        error={this.state.validForm.congnom_2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="data_naixement"
                                        label="Data de naixement"
                                        type="date"
                                        defaultValue=""
                                        className={classes.textField}
                                        value={this.state.data_naixement}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChange('data_naixement')}
                                        
                                        error={this.state.validForm.data_naixement}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button type="submit" variant="raised" color="primary" className={classes.button}>
                                        Actualitzar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Actualitzar contrassenya</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.details}>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            id="password_actual"
                                            type="password"
                                            label="Contrasenya Actual"
                                            className={classes.textField}
                                            value={this.state.password_actual}
                                            onChange={this.handleChangePassword('password_actual')}
                                            margin="normal"
                                            error={this.state.validFormPassword.password_actual}
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            id="password_nova"
                                            type="password"
                                            label="Nova contrasenya"
                                            className={classes.textField}
                                            value={this.state.password_nova}
                                            onChange={this.handleChangePassword('password_nova')}
                                            margin="normal"
                                            error={this.state.validFormPassword.password_nova}
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            id="password_nova_2"
                                            type="password"
                                            label="Nova contrasenya"
                                            className={classes.textField}
                                            value={this.state.password_nova_2}
                                            onChange={this.handleChangePassword('password_nova_2')}
                                            margin="normal"
                                            error={this.state.validFormPassword.password_nova_2}
                                        />
                                        </Grid>
                                    </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button onClick={this.handleActualitzarContrassenya} size="small" color="primary">
                                Actualitzar contrassenya
                                </Button>
                            </ExpansionPanelActions>
                         </ExpansionPanel>
                    </Grid>
                    <Grid item xs={true} md={2}/>
                    <Notificacio 
                        open={this.state.mostrarNotificacio}
                        missatge={this.state.titolNotificacio}
                        onCloseNotificacio={this.tancarNotificacio.bind(this)}
                    />
                </Grid>
            </form>
        );
    }
}

Perfil.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Perfil);