import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
    root: {
        flexGrow: 1,
        marginTop: '15%'
    }
};

class Missatge extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Typography variant="display1" gutterBottom style={{textAlign: 'center'}}>
                            {this.props.missatge}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Missatge.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Missatge);