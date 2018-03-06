import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class FormulariCrearCentre extends React.Component {

  constructor() {
    super();
    this.state = {
      nom: '',
      ubicacio: ''
    };
  }

  onClickCrear() {
    let centre = {
      nom: this.state.nom,
      ubicacio: this.state.ubicacio
    };
    this.props.onCreateCentre(centre);
  }

  onChangeNomInputText(event) {
    this.setState({nom: event.target.value})
  }

  onChangeUbicacioInputText(event) {
    this.setState({ubicacio: event.target.value})
  }

  render() {
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nou centre</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la creació d'un centre
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              name="nom"
              label="Nom del centre"
              type="text"
              onChange={this.onChangeNomInputText.bind(this)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="ubicacio"
              name="ubicacio"
              label="Ubicació del centre"
              type="text"
              onChange={this.onChangeUbicacioInputText.bind(this)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.onClickCrear.bind(this)} color="primary">
              Crear
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

