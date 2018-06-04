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
        width: 200,
        height: 200,
    },
    center: {
        display: 'block',
        margin: '0 auto',
    }
});

class Autor extends React.Component {

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
                        alt="Llorenç Seguí Capllonch"
                        src="https://avatars0.githubusercontent.com/u/11377505?s=460&v=4"
                        className={classNames(classes.avatar, classes.bigAvatar, classes.center)}
                    />
                    </Grid>
                    <Grid item xs={12} style={{marginTop: '5%', marginBottom: "5%"}}>
                        <Typography className={classes.link} variant="body2" style={{textAlign: 'center'}}>Web desenvolupada per Llorenç Seguí Capllonch</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{width: '214px'}} className={classes.center}>
                        <a href="https://es.linkedin.com/in/lloren%C3%A7-segu%C3%AD-capllonch-4aa172a9"><img  src="https://image.flaticon.com/icons/png/512/174/174857.png" style={{marginRight: '14px'}} alt="Linkedin" height="100" width="100" /></a>
                        <a href="https://github.com/llorenssegui"><img  src="http://pluspng.com/img-png/ok-calling-myself-a-developer-would-be-a-stretch-but-still-two-years-ago-i-had-no-clue-what-git-and-github-was-and-how-to-do-a-pr-256.png" style={{textAlign: 'right'}} alt="Github" height="100" width="100" /></a>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

Autor.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Autor);