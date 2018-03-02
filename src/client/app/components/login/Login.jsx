import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AuthService from '../../services/AuthService.jsx';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    login_container: {
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
});

class Login extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
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
                alert(err);
            })
    }

    componentWillMount() {
        if(this.Auth.loggedIn()) {
            this.props.history.replace('/');
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <form onSubmit={this.handleFormSubmit}>
                <Grid container spacing={24} className={classes.login_container}>
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
                    </Grid>
                </Grid>
            </form>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Login);