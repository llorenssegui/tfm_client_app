import React from 'react';
import withAuth from '../functions/withAuth.jsx';
import Centre from '../centre/Centre.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
});

class Centres extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.centres.map(c => {
                        return(
                        <Grid item xs={12} sm={6}><Centre 
                            key={c.id}
                            nom={c.nom}
                            ubicacio={c.ubicacio}
                        /></Grid>);
                    })}            
                </Grid>
            </div>
        );
    }
}

Centres.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Centres);