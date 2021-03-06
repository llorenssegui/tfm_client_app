import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = {
    root: {
        bottom:0,
        position: 'absolute',
        width: '100%',
        height: '30px',   /* Height of the footer */
        backgroundColor: '#E1E2E1',
    },
    link: {
        cursor: 'pointer',
    }
};
  
  class Footer extends React.Component {
  
      constructor(props) {
          super(props);
      }

      render() {
          const { classes } = this.props;
          return(
            <footer id="footer" className={classes.root}>
                <Grid container>
                    <Grid item xs={4}>
                        <a href="/autor"><Typography className={classes.link} variant="body2" style={{textAlign: 'center'}}>Autor</Typography></a>
                    </Grid>
                    <Grid item xs={4}>
                        <a href="/contacte"><Typography className={classes.link} variant="body2" style={{textAlign: 'center'}}>Contacte</Typography></a>
                    </Grid>
                    <Grid item xs={4}>
                        <a href="/legal"><Typography className={classes.link} variant="body2" style={{textAlign: 'center'}}>Avis legal</Typography></a>
                    </Grid>
                </Grid>
            </footer>
          );
      }
  }
  
  Footer.propTypes = {
      classes: PropTypes.object.isRequired,
  };
    
  export default withStyles(styles)(Footer);