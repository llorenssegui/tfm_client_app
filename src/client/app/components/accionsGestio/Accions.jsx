import React from 'react';
import Assignatura from '../assignatura/Assignatura.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import FormulariAccio from './FormulariAccio.jsx';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Accions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objecte: this.props.objecte ? this.props.objecte : undefined,
            objecteEditar: undefined,
            formulariObert: false
        }
    }

    componentWillMount() {
        this.setState({
            objecte: this.objecte ? this.objecte : undefined,
            objecteEditar: undefined,
            formulariObert: false
        });
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            objecte: nextProps.objecte ? nextProps.objecte : undefined,
            objecteEditar: undefined,
            formulariObert: false
        });
    }

    accioEditar () {
        this.setState({
            objecteEditar: this.state.objecte,
            formulariObert: true
        });
    }

    accioAfegir () {
        this.setState({
            objecteEditar: undefined,
            formulariObert: true
        });
    }

    processarAccio (objecte) {
        this.props.precessarAccio(objecte, this.props.titolAccio);
        this.tancarFormulari();
    }

    tancarFormulari () {
        this.setState({
            objecteEditar: undefined,
            formulariObert: false
        });
    }

    render () {
        const { classes } = this.props;
        return (
            <div style={{textAlign: 'center'}}>
                <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button} onClick={this.accioEditar.bind(this)}>
                    <Icon>edit_icon</Icon>
                </Button>
                <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button} onClick={this.accioAfegir.bind(this)}>
                    <AddIcon />
                </Button>
                <FormulariAccio 
                    open={this.state.formulariObert}
                    objecte={this.state.objecteEditar}
                    titolAccio={this.props.titolAccio}
                    accioProcessarFormulari={this.processarAccio.bind(this)}
                    handleClose={this.tancarFormulari.bind(this)}
                />
            </div>
        );
    }

}

Accions.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Accions);