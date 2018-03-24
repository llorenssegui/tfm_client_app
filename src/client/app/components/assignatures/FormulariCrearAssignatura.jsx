import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
    selectControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
});

class FormulariCrearAssignatura extends React.Component {

  constructor(props) {
    super(props);
    let nom = "";
    let modeModificar = false;
    if(this.props.assignatura) {
      modeModificar = true;
      nom = this.props.assignatura.nom;
    }
    let curs = "";
    if(this.props.cursos && this.props.cursos.length) {
        curs = this.props.cursos[0].nom + " " + this.props.cursos[0].nivell;
    }
    this.state = {
      curs: curs,
      nom: nom,
      modeModificar: modeModificar
    };
  }

  componentWillReceiveProps(nextProps) {
    let nom = "";
    let modeModificar = false;
    if(nextProps.assignatura) {
      modeModificar = true;
      nom = nextProps.assignatura.nom;
    }
    this.setState({nom: nom, modeModificar: modeModificar});
  }

  onClickProcessarFormulari() {
    if(this.state.nom && this.state.nom !== "") {
      let assignatura = {
        nom: this.state.nom
      };
      if(this.state.modeModificar) {
        assignatura.id = this.props.assignatura.id;
        this.props.onUpdateAssignatura(assignatura);
      } else {
        this.props.onCreateAssignatura(assignatura);
      }
    }
  }

  onChangeNomAssignaturaInputText(event) {
    this.setState({nom: event.target.value});
  }

  onChangeCurs = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (        
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.modeModificar ? 'Actualitzar Assignatura' : 'Nova Assignatura'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulari per a la {this.state.modeModificar ? 'actualització' : 'creació'} d'una assignatura
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              name="nom"
              label="Nom de l'assignatura"
              type="text"
              value={this.state.nom}
              onChange={this.onChangeNomAssignaturaInputText.bind(this)}
              fullWidth
            />
            <div>
            <InputLabel htmlFor="curs-simple">Curs</InputLabel>
            <Select
                value={this.state.curs}
                onChange={this.onChangeCurs}
                inputProps={{
                name: 'curs',
                id: 'curs-simple',
                }}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </div>
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

FormulariCrearAssignatura.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(FormulariCrearAssignatura);

