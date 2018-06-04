import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%'
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 350,
        height: 350,
    },
    center: {
        display: 'block',
        margin: '0 auto',
    }
});

class Contacte extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                    <Avatar
                        alt="Contacte"
                        src="https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Inbox_by_Gmail_logo.png"
                        className={classNames(classes.avatar, classes.bigAvatar, classes.center)}
                    />
                    </Grid>
                    <Grid item xs={12} style={{marginTop: '5%', marginBottom: "5%"}}>
                        <Typography className={classes.link} variant="body2" style={{textAlign: 'center'}}>Per a qualsevol problema o suggeriment, possis en contacte amb nosaltres a través de la següent adreça de correu:</Typography>
                        <Typography className={classes.link} variant="body2" style={{textAlign: 'center'}}>llorenssegui@gmail.com</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

Contacte.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Contacte);