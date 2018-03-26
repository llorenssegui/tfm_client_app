import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    selectControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
});

class FormulariCrearAssignatura extends React.Component {

  constructor(props) {
    super(props);
    let nom = "";
    let curs = 0;
    let modeModificar = false;
    if(this.props.assignatura) {
      modeModificar = true;
      nom = this.props.assignatura.nom;
      curs = this.props.assignatura.curs;
    }   
    this.state = {
      curs: curs,
      nom: nom,
      modeModificar: modeModificar
    };
  }

  componentWillReceiveProps(nextProps) {
    let nom = "";
    let curs = 0;
    let modeModificar = false;
    if(nextProps.assignatura) {
      modeModificar = true;
      nom = nextProps.assignatura.nom;
      curs = nextProps.assignatura.curs;
    }
    this.setState({nom: nom, curs: curs, modeModificar: modeModificar});
  }

  onClickProcessarFormulari() {
    if(this.state && this.state.curs && this.state.curs != 0 && this.state.nom && this.state.nom !== "") {
      let assignatura = {
        nom: this.state.nom,
        curs: this.state.curs
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
    this.setState({ curs: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (        
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.container}
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
            <TextField
              id="select-curs-native"
              select
              label="Cursos"
              className={classes.textField}
              value={this.state.curs}
              onChange={this.onChangeCurs}
              SelectProps={{
                MenuProps: {
                  native: "false",
                  className: classes.menu,
                },
              }}
              helperText="Selecciona el curs acadèmic de l'assignatura"
              margin="normal"
            >
              {this.props.cursos.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nom} ({option.nivell})
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

FormulariCrearAssignatura.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(FormulariCrearAssignatura);

