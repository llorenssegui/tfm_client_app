import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AuthService from '../../services/AuthService.jsx';
import IconaLogin from '../iconaLogin/iconaLogin.jsx';
import ResponsiveDialog from '../dialogs/DialogComponent.jsx';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    login_container: {
        marginTop: '10%',
        textAlign: 'center',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    icon: {
        textAlign: 'center'
    }
});

class Login extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            dialogObert: false
        }
    }
  
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e) {
        e.preventDefault();
      
        this.Auth.login(this.state.email,this.state.password)
            .then(res => {
               this.props.history.replace('/');
               location.reload();
            })
            .catch(err => {
                this.setState({dialogObert: true});
            })
    }

    componentWillMount() {
        if(this.Auth.loggedIn()) {
            this.props.history.replace('/');
        }     
    }

    tancarDialog() {
        this.setState({dialogObert: false});
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={24} className={classes.login_container}>
            <Grid item md={4} xs={2} />
            <Grid item md={4} xs={8}>
            <Paper className={classes.paper}>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid container spacing={24} className={classes.login_container}>
                        <Grid item xs={12} className={classes.icon}><IconaLogin /></Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label="E-mail"
                                name="email"
                                className={classes.textField}
                                placeholder="E-mail"
                                margin="normal"
                                type="email"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                label="Contrassenya"
                                className={classes.textField}
                                margin="normal"
                                type="password"
                                placeholder="Contrasenya"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="raised" color="primary" className={classes.button}>
                                Accedeix
                            </Button>
                            <Button variant="raised" className={classes.button}>
                                Registre't
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            </Grid>
            <Grid item md={4} xs={2} />
            <ResponsiveDialog 
                open={this.state.dialogObert} 
                missatge="Usuari i contrasenya incorrectes"
                titol="Error d'autenticació"
                tancarDialog={this.tancarDialog.bind(this)}
            />
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Login);