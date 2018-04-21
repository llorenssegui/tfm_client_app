import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class FormulariActivitat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nom: this.props.alumne ? this.props.alumne.nom : "",
      congnom_1: this.props.alumne ? this.props.alumne.congnom_1 : "",
      congnom_2: this.props.alumne ? this.props.alumne.congnom_2 : "",
      modeModificar: this.props.modeModificar ? this.props.modeModificar : false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        nom: nextProps.alumne ? nextProps.alumne.nom : "",
        congnom_1: nextProps.alumne ? nextProps.alumne.congnom_1 : "",
        congnom_2: nextProps.alumne ? nextProps.alumne.congnom_2 : "",
        modeModificar: nextProps.modeModificar ? nextProps.modeModificar : false
    });
  }

  onClickProcessarFormulari() {
    let alumne = {
        nom: this.state.nom,
        congnom_1: this.state.congnom_1,
        congnom_2: this.state.congnom_2,
        centre: Number(this.props.centre),
        grup: Number(this.props.grup)
    };
    let idAlumne = this.props.alumne ? this.props.alumne.id : undefined;
    this.props.onProcessarFormulari(alumne, idAlumne);
  }

  onChangeNom (event) {
    this.setState({nom: event.target.value});
  }

  onChangeCongnom_1 (event) {
    this.setState({congnom_1: event.target.value});
  }

  onChangeCongnom_2 (event) {
    this.setState({congnom_2: event.target.value});
  }

  render() {
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.onClickTancarFormulari}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.modeModificar ? 'Actualitzar Alumne' : 'Nou Alumne'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la {this.state.modeModificar ? 'actualització' : 'creació'} d'un alumne
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              name="nom"
              label="Nom"
              type="text"
              value={this.state.nom}
              onChange={this.onChangeNom.bind(this)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="congnom_1"
              name="congnom_1"
              label="Congnom 1"
              type="text"
              value={this.state.congnom_1}
              onChange={this.onChangeCongnom_1.bind(this)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="congnom_2"
              name="congnom_2"
              label="Congnom 2"
              type="text"
              value={this.state.congnom_2}
              onChange={this.onChangeCongnom_2.bind(this)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClickTancarFormulari} color="primary">
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

