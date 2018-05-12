import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

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
      nom: this.props.activitat ? this.props.activitat.nom : "",
      avaluable: this.props.activitat ? this.props.activitat.avaluable : true,
      semestre: this.props.activitat ? this.props.activitat.trimestre : this.props.semestre,
      ponderacio: this.props.activitat ? this.props.activitat.ponderacio : 0,
      modeModificar: this.props.modeModificar ? this.props.modeModificar : false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        nom: nextProps.activitat ? nextProps.activitat.nom : "",
        avaluable: nextProps.activitat ? nextProps.activitat.avaluable : true,
        semestre: nextProps.activitat ? nextProps.activitat.trimestre : nextProps.semestre,
        ponderacio: nextProps.activitat ? nextProps.activitat.ponderacio : 0,
        modeModificar: nextProps.modeModificar ? nextProps.modeModificar : false
    });
  }

  onClickProcessarFormulari() {
    let activitat = {
        nom: this.state.nom,
        avaluable: this.state.avaluable,
        trimestre: this.state.semestre,
        ponderacio: Number(this.state.ponderacio),
    };
    let idActivitat = this.props.activitat ? this.props.activitat.id : undefined;
    this.props.onProcessarFormulari(activitat, idActivitat);
  }

  onChangeNom (event) {
    this.setState({nom: event.target.value});
  }

  onChangePonderacio(event) {
    this.setState({ponderacio: event.target.value});
  }

  onChangeAvaluable () {
    this.setState({avaluable: !this.state.avaluable});
  }

  onChangeSemestre = event => {
    this.setState({ semestre: event.target.value });
  };

  render() {
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.onClickTancarFormulari}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.modeModificar ? 'Actualitzar Activitat' : 'Nova Activitat'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la {this.state.modeModificar ? 'actualització' : 'creació'} d'una activitat
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              name="nom"
              label="Nom de l'activitat"
              type="text"
              value={this.state.nom}
              onChange={this.onChangeNom.bind(this)}
              fullWidth
            />
            <FormControlLabel
                control={
                    <Switch
                    checked={this.state.avaluable}
                    onChange={this.onChangeAvaluable.bind(this)}
                    value="checkedB"
                    color="primary"
                    />
                }
                label="Avaluable"
            />
            {this.state.avaluable === true &&
            <TextField
              margin="dense"
              id="ponderacio"
              name="ponderacio"
              label="Ponderació ( % )"
              type="number"
              value={this.state.ponderacio}
              onChange={this.onChangePonderacio.bind(this)}
              fullWidth
            />
            }
            {this.state.modeModificar === true &&
            <TextField
              id="select-semestre-native"
              select
              label="Semestres"
              value={this.state.semestre}
              onChange={this.onChangeSemestre}
              SelectProps={{
                  MenuProps: {
                  native: "false",
                  },
              }}
              helperText="Selecciona el semestre"
              margin="normal"
              >
              {this.props.semestres.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                  {option.nom}
                  </MenuItem>
              ))}
            </TextField>
            }
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

