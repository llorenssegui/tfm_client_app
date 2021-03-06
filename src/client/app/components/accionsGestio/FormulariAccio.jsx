import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class FormulariAccio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        objecte: this.props.objecte ? this.props.objecte : undefined,
        modeModificar: this.props.objecte ? true : false,
        nom: this.props.objecte ? this.props.objecte.nom : ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        objecte: nextProps.objecte ? nextProps.objecte : undefined,
        modeModificar: nextProps.objecte ? true : false,
        nom: nextProps.objecte ? nextProps.objecte.nom : ""
    });
  }

  onClickProcessarFormulari() {
    if(this.state.objecte && this.state.objecte.nom !== "") {
        this.props.accioProcessarFormulari(this.state.objecte);
    } else if(this.state.nom) {
      this.props.accioProcessarFormulari({
        nom: this.state.nom
      });
    }
  }

  onChangeNomInputText(event) {
    let objecte = this.state.objecte;
    if(objecte) objecte.nom = event.target.value;
    this.setState({
      objecte: objecte,
      nom: event.target.value
    });
  }

  render() {
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.modeModificar ? 'Actualitzar ' + this.props.titolAccio : 'Nou ' + this.props.titolAccio}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la {this.state.modeModificar ? 'actualització' : 'creació'} d'un {this.props.titolAccio}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              name="nom"
              label={"Nom del " + this.props.titolAccio}
              type="text"
              value={this.state.nom}
              onChange={this.onChangeNomInputText.bind(this)}
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

