import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AnyAcademic from '../anyAcademic/AnyAcademic.jsx';
import config from '../../../../../config.js';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '5%'
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
    },
});

class AnysAcademics extends React.Component {

    state = {
        anysAcademics: [],
        centre: this.props.match.params.idCentre
    };

    constructor(props) {
        super(props);
        console.log(this.state);
    }

    componentDidMount() {
        let url = config.apiEndpoint + '/anysacademics/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((anysAcademics) => {
            let filteredanysAcademics = anysAcademics.filter((anyAcademic) => anyAcademic.centre == this.props.match.params.idCentre);
            this.setState({ anysAcademics: filteredanysAcademics, centre: this.props.match.params.idCentre});
            
        })
    }

    handleFormulari () {

    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={6}>
                    <Grid container spacing={24}>
                    {this.state.anysAcademics.map((aa) => 
                        <Grid item xs={12} sm={6}>
                            <AnyAcademic anyInici={aa.anyInici} anyFi={aa.anyFi}/>
                        </Grid>
                    )}
                    </Grid>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                <Button onClick={this.handleFormulari.bind(this)} variant="fab" color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button>
            </div>
         );
    }
}

AnysAcademics.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AnysAcademics);