import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class FormulariCrearAnyAcademic extends React.Component {

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
      modeModificar: modeModificar
    };
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
    this.setState({anyInici: anyInici, anyInici: anyFi, modeModificar: modeModificar});
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
              autoFocus
              margin="dense"
              id="anyInici"
              name="anyInici"
              label="Any d'inici"
              type="number"
              value={this.state.anyInici}
              onChange={this.onChangeAnyIniciInputText.bind(this)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="anyFi"
              name="anyFi"
              label="Any de finalitzacio"
              type="number"
              value={this.state.anyFi}
              onChange={this.onChangeAnyFiInputText.bind(this)}
              fullWidth
            />
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

