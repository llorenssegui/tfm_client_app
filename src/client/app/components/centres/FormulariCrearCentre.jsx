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

  constructor(props) {
    super(props);
    let nomCentre = '';
    let ubicacioCentre = '';
    let modeModificar = false;
    if(this.props.centre) {
      modeModificar = true;
      nomCentre = this.props.centre.nom;
      ubicacioCentre = this.props.centre.ubicacio;
    }
    this.state = {
      nom: nomCentre,
      ubicacio: ubicacioCentre,
      modeModificar: modeModificar
    };
  }

  onClickProcessarFormulari() {
    let centre = {
      nom: this.state.nom,
      ubicacio: this.state.ubicacio
    };
    if(this.state.modeModificar) {
      centre.id = this.props.centre.id;
      this.props.onUpdateCentre(centre);
    } else {
      this.props.onCreateCentre(centre);
    }
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
          <DialogTitle id="form-dialog-title">{this.state.modeModificar ? 'Actualitzar Centre' : 'Nou Centre'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la {this.state.modeModificar ? 'actualització' : 'creació'} d'un centre
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              name="nom"
              label="Nom del centre"
              type="text"
              value={this.state.nom}
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
              value={this.state.ubicacio}
              onChange={this.onChangeUbicacioInputText.bind(this)}
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

