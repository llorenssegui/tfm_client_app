import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AnyAcademic from '../anyAcademic/AnyAcademic.jsx';
import config from '../../../../../config.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '5%'
  },
});

class AnysAcademics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anysAcademics: [],
            centre: this.props.match.params.idCentre
        };
    }

    componentWillMount() {
        let url = config.apiEndpoint + '/anysacademics/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((anysAcademics) => {
            let filteredanysAcademics = anysAcademics.filter((anyAcademic) => anyAcademic.centre === this.state.centre);
            console.log(anysAcademics);
            this.setState({ anysAcademics: [{id: 1, anyInici: 2017, anyFi: 2018, centre: 1}] });
        })
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
                    {this.state.anysAcademics.map((aa) => {
                        <Grid item xs={12} sm={6}>
                            <AnyAcademic anyInici={aa.anyInici} anyFi={aa.anyFi}/>
                        </Grid>
                    })}
                    </Grid>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
         );
    }
}

AnysAcademics.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AnysAcademics);