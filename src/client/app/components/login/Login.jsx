import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

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

    state={email: ''};
  
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return(
            <form>
                <Grid container spacing={24} className={classes.login_container}>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="E-mail"
                            className={classes.textField}
                            value={this.state.email}
                            placeholder="E-mail"
                            margin="normal"
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Contrassenya"
                            className={classes.textField}
                            margin="normal"
                            type="password"
                            placeholder="Contrasenya"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="raised" color="primary" className={classes.button}>
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