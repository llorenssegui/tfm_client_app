import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DialogComponent from '../dialogs/DialogComponent.jsx';
import TitolHeaderService from '../../services/TitolHeaderService.jsx';

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
});

class Registre extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            alertDialogObert: false,
            nom: "",
            congnom_1: "",
            congnom_2: "",
            data_naixement: "",
            email: "",
            password: "",
            password_2: "",
            validForm: {},
            missatgeEmailExistent: "Ja existeix un compte amb el correu",
            dialogObert: false
        };
        this.propsNotValidate = [
            "validForm",
            "missatgeEmailExistent",
            "dialogObert",
            "alertDialogObert",
        ];
        this.Auth = new AuthService();
        this.titolHeaderService = new TitolHeaderService();
    }

    componentWillMount () {
        let validFormAux = {};
        for (let key in this.state) {
            if(this.propsNotValidate.indexOf("" + key) == -1) {   
                validFormAux[key] = false;
            }
        }
        this.setState({validForm: validFormAux});
    }

    componentDidMount () {
        this.titolHeaderService.setTitol("Teacher Support: Registre");
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

    handleChangePassword = password => event => {
        let encr_password = event.target.value;
        this.setState({
          [password]: encr_password,
        });
    }

    isErrror (stateAttr) {
        return true;
    }

    tancarDialog () {
        this.setState({
            dialogObert: false
        });
    }

    formIsValid() {
        let validFormAux = {};
        let isValid = true;
        for (let key in this.state) {
            if(this.propsNotValidate.indexOf("" + key) == -1 && (!this.state[key] || this.state[key] === "")) {   
                validFormAux[key] = true;
                isValid = false;
            }
        }
        this.setState({validForm: validFormAux});
        return isValid;
    }

    handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        var that = this;
        let url = config.apiEndpoint + '/professors/';
        if(this.formIsValid() && this.state.password === this.state.password_2) {
            let professor = {
                nom: this.state.nom,
                email: this.state.email,
                congnom_1: this.state.congnom_1,
                congnom_2: this.state.congnom_2,
                data_naixement: this.state.data_naixement,
                password: this.state.password
            };
            this.setState({password_2: undefined});
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professor)
            }).then(function(response) {  
                if(response.status === 200 || response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    let vf = that.state.validForm;
                    vf["email"] = true;
                    that.setState({
                        dialogObert: true,
                        missatgeEmailExistent: that.state.missatgeEmailExistent + ": " + that.state.email,
                        validForm: vf
                    });
                    return false;
                } else if (response.status === 401) {
                    this.props.history.replace('/login');
                }
            }).then((professor) => {
                if(professor !== false) {
                    this.Auth.login(this.state.email, this.state.password)
                    .then(res => {
                        this.props.history.replace('/');
                    })
                    .catch(err => {
                        console.log("Error", err);
                    });
                }
            }).catch(function(error) {
                const status = error.response ? error.response.status : 500
                if (status === 401) {
                    this.props.history.replace('/login');
                }
            });
        }
    };

    render() {
        const { classes } = this.props;
        return(
            <form onSubmit={this.handleFormSubmit} className={classes.root}>
                <Grid container>
                    <DialogComponent 
                        open={this.state.dialogObert} 
                        tancarDialog={this.tancarDialog.bind(this)} 
                        missatge={this.state.missatgeEmailExistent}
                    />
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChange('data_naixement')}
                                        
                                        error={this.state.validForm.data_naixement}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="email"
                                        type="email"
                                        label="Correu electrònic"
                                        className={classes.textField}
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        margin="normal"
                                        
                                        error={this.state.validForm.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="password"
                                        type="password"
                                        label="Contrasenya"
                                        className={classes.textField}
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        margin="normal"
                                        
                                        error={this.state.validForm.password}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="password_2"
                                        type="password"
                                        label="Repeteix la contrasenya"
                                        className={classes.textField}
                                        value={this.state.password_2}
                                        onChange={this.handleChange('password_2')}
                                        margin="normal"
                                        
                                        error={this.state.validForm.password_2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button type="submit" variant="raised" color="primary" className={classes.button}>
                                        Registre't
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={true} md={2}/>
                </Grid>
            </form>
        );
    }
}

Registre.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Registre);