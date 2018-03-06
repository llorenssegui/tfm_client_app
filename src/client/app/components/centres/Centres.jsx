import React from 'react';
import withAuth from '../functions/withAuth.jsx';
import Centre from '../centre/Centre.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import FormulariCrearCentre from './FormulariCrearCentre.jsx';
import config from '../../../../../config.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
    },
});

class Centres extends React.Component {
    state = {
        formulariObert: false
    };

    handleFormulari (event) {
        this.setState({ formulariObert: true });
    }

    handleCloseFormulari (event) {
        this.setState({ formulariObert: false });
    }

    handleCrearCentre (centre) {
        this.setState({ formulariObert: false });
        console.log(JSON.stringify(centre));
        let url = config.apiEndpoint + '/centres/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(centre)
        }).then(function(response) {  
            return response.json();
        }).then(data => {
            this.setState({formulariObert:false});
            //this.props.centres.push(centre);
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.centres.map(c => {
                        return(
                        <Grid item xs={12} sm={6}>
                            <Centre 
                                key={c.id}
                                nom={c.nom}
                                ubicacio={c.ubicacio}
                            />
                        </Grid>);
                    })}
                    <Button onClick={this.handleFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button> 
                    <FormulariCrearCentre 
                        open={this.state.formulariObert}
                        handleClose={this.handleCloseFormulari.bind(this)}
                        onCreateCentre={this.handleCrearCentre.bind(this)}
                    />          
                </Grid>
            </div>
        );
    }
}

Centres.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Centres);