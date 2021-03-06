import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import DialogContent from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Utils from '../../utils.jsx';
import ChipsArray from '../chipsArray/ChipsArray.jsx';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5%'
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  selectControl: {
    margin: theme.spacing.unit,
    width: '90%'
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
  button: {
    //margin: theme.spacing.unit,
    marginTop: '20px',
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FormulariAssignatura extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        nom: "",
        curs: 0,
        avaluacions: [],
        countAvaluacios: 0,
        avaluacio: "",
      };
      this.utils = new Utils();
  }

  handleClose = () => {
    this.props.close();
  }

  onChangeNomAssignaturaInputText(event) {
    this.setState({nom: event.target.value});
  }

  onChangeCurs = event => {
    this.setState({ curs: event.target.value });
  }

  onChangeNomAvaluacioInputText(event) {
    this.setState({ avaluacio: event.target.value });
  }

  handleCrearAssignatura() {
    if(this.state && this.state.curs && this.state.curs != 0 && this.state.nom && this.state.nom !== "") {
      let assignatura = {
        nom: this.state.nom,
        curs: this.state.curs
      };
      this.setState({nom: "", curs: 0});
      this.props.onCreate(assignatura, this.state.avaluacions);
    }
  }

  crearAvaluacio() {
    if(this.state.avaluacio && this.state.avaluacio != "") {
      let avaluacio = {
        key: Number(this.state.countAvaluacios),
        label: this.state.avaluacio,
        canView: true
      };
      let nextAvaluacio = this.state.countAvaluacios + 1;
      this.setState({
        avaluacions: this.state.avaluacions.concat([avaluacio]), 
        countAvaluacios: nextAvaluacio,
        avaluacio: ""
      });
    }
  }

  borrarAvaluacio(avaluacio) {
    let novesAvaluacions = this.state.avaluacions.filter(a => a.key !== avaluacio.key);
    this.setState({avaluacions: novesAvaluacions});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.cursos && nextProps.cursos.length > 0) {
      this.setState({curs: nextProps.cursos[0].id});
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleClose}
          transition={Transition}
          
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Crear Assignatura
              </Typography>
              <Button color="inherit" onClick={this.handleCrearAssignatura.bind(this)}>
                Crear
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.container}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={6}>
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
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                id="select-curs-native"
                select
                label="Curs"
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
                className={classes.selectControl}
                >
                {this.props.cursos.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.nom} ({option.nivell})
                    </MenuItem>
                ))}
                </TextField>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={4}>
                <TextField
                autoFocus
                margin="dense"
                id="avaluacio"
                name="avaluacio"
                label="Avaluació"
                type="text"
                value={this.state.avaluacio}
                onChange={this.onChangeNomAvaluacioInputText.bind(this)}
                fullWidth
                />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={1}>
                <Button 
                  variant="raised" 
                  color="primary" 
                  size="small" 
                  className={classes.button}
                  onClick={this.crearAvaluacio.bind(this)}
                >
                  Afegir
                </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <ChipsArray 
                    chipData={this.state.avaluacions}
                    deleteChip={this.borrarAvaluacio.bind(this)}
                  />
                </Grid>
            </Grid>
            </div>
        </Dialog>
      </div>
    );
  }
}

FormulariAssignatura.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormulariAssignatura);
