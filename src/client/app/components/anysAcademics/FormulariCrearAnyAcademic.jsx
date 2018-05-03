import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class FormulariCrearAnyAcademic extends React.Component {

  constructor(props) {
    super(props);
    let anyInici = 0;
    let anyFi = 0;
    let modeModificar = false;
    if(this.props.centre) {
      modeModificar = true;
      anyInici = this.props.anyAcademic.anyInici;
      anyFi = this.props.anyAcademic.anyFi;
    }
    this.state = {
      anyFi: anyFi,
      anyInici: anyInici,
      modeModificar: modeModificar,
      anys: []
    };
  }

  componentWillMount () {
    let any = Number(new Date().getFullYear()) - 1;
    let anys = [any];
    for(let i = 0; i < 10; i++) {
      anys.push(anys[anys.length - 1] + 1);
    }
    this.setState({anys: anys});
  }

  componentWillReceiveProps(nextProps) {
    let anyInici = 0;
    let anyFi = 0;
    let modeModificar = false;
    if(nextProps.anyAcademic) {
      modeModificar = true;
      anyInici = nextProps.anyAcademic.anyInici;
      anyFi = nextProps.anyAcademic.anyFi;
    }
    this.setState({anyInici: anyInici, anyFi: anyFi, modeModificar: modeModificar});
  }

  onClickProcessarFormulari() {
    if(this.state.anyInici !== 0 && this.state.anyFi !== 0) {
      let anyAcademic = {
        anyInici: this.state.anyInici,
        anyFi: this.state.anyFi
      };
      if(this.state.modeModificar) {
        anyAcademic.id = this.props.anyAcademic.id;
        this.props.onUpdateAnyAcademic(anyAcademic);
      } else {
        this.props.onCreateAnyAcademic(anyAcademic);
      }
    }
  }

  onChangeAnyIniciInputText(event) {
    this.setState({anyInici: event.target.value});
  }

  onChangeAnyFiInputText(event) {
    this.setState({anyFi: event.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.modeModificar ? 'Actualitzar Any Acadèmic' : 'Nou Any Acadèmic'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la {this.state.modeModificar ? 'actualització' : 'creació'} d'un any acadèmic
            </DialogContentText>
            <TextField
              id="select-anyInici-native"
              select
              label="Any d'inici"
              className={classes.textField}
              value={this.state.anyInici}
              onChange={this.onChangeAnyIniciInputText.bind(this)}
              SelectProps={{
                MenuProps: {
                  native: "false",
                  className: classes.menu,
                },
              }}
              helperText="Selecciona l'any acadèmic"
              margin="normal"
            >
              {this.state.anys.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-anyFi-native"
              select
              label="Any de fi"
              className={classes.textField}
              value={this.state.anyFi}
              onChange={this.onChangeAnyFiInputText.bind(this)}
              SelectProps={{
                MenuProps: {
                  native: "false",
                  className: classes.menu,
                },
              }}
              helperText="Selecciona l'any acadèmic"
              margin="normal"
            >
              {this.state.anys.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.onClickProcessarFormulari.bind(this)} color="primary">
            {this.state.modeModificar ? 'Actualitzar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

FormulariCrearAnyAcademic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormulariCrearAnyAcademic);

