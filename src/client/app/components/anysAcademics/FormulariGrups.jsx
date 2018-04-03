import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import ChipsArray from '../chipsArray/ChipsArray.jsx';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  selectControl: {
    margin: theme.spacing.unit,
    width: '90%'
  },
  button: {
    marginTop: '20px',
  },
  chipContainer: {
    marginTop: '2%'
  }
});

class FormulariGrups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          cursos: [],
          curs: 0,
          grups: [],
          grup: "",
        };
        this.Auth = new AuthService();
    }

    onChangeCurs = event => {
      let curs = event.target.value;
      this.setState({ curs: curs });
      this.requestGrups(function(grups, context) {
        
        let grupsFiltrats = grups.filter(g => Number(g.curs) === Number(context.state.curs) && Number(g.centre === Number(context.props.centre)));

        let buildChipsGrups = [];
        for(var i = 0; i < grupsFiltrats.length; i++) {
          let canView = true;
          if(grupsFiltrats.length === 1 && grupsFiltrats[i].nom.includes("Default")) {
            canView = false;
          }
          let chip = {
            key: grupsFiltrats[i].id,
            label: grupsFiltrats[i].nom,
            canView: canView
          }
          buildChipsGrups.push(chip);
        }
        context.setState({ grups: buildChipsGrups });
      });
    }

    onChangeNomGrupInputText(event) {
      this.setState({ grup: event.target.value });
    }

    componentWillMount () {
        let url = config.apiEndpoint + '/cursos/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        })
        .then((response) => {
          if(response.status === 200 || response.status === 201) {
            return response.json();
          } else if (response.status === 401) {
              this.props.history.replace('/login');
          }
        })
        .then((cursos) => {
          if(cursos) {
            let curs = 0;
            if(cursos && cursos.length > 0) {
              curs = cursos[0].id;
            }
            this.setState({ cursos: cursos, curs: curs});
            this.requestGrups(function(grups, context) {
              let grupsFiltrats = grups.filter(g => Number(g.curs) === Number(context.state.curs) && Number(g.centre === Number(context.props.centre)));
              let buildChipsGrups = [];
              for(var i = 0; i < grupsFiltrats.length; i++) {
                let canView = true;
                if(grupsFiltrats.length === 1 && grupsFiltrats[i].nom.includes("Default")) {
                  canView = false;
                }
                let chip = {
                  key: grupsFiltrats[i].id,
                  label: grupsFiltrats[i].nom,
                  canView: canView
                }
                buildChipsGrups.push(chip);
              }
              context.setState({ grups: buildChipsGrups });
            });
          }
        }).catch(function(error) {
          const status = error.response ? error.response.status : 500
          if (status === 401) {
              this.props.history.replace('/login');
          }
       });
    }

    requestGrups (callback) {
      let url = config.apiEndpoint + '/grups/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            }
        })
        .then((response) => {
          if(response.status === 200 || response.status === 201) {
            return response.json();
          } else if (response.status === 401) {
              this.props.history.replace('/login');
          }
        })
        .then((grups) => {
            if(grups) callback(grups, this);
        }).catch(function(error) {
          const status = error.response ? error.response.status : 500
          if (status === 401) {
              this.props.history.replace('/login');
          }
       });
    }

    requestPOSTGrup (grup, callback) {
      
      let url = config.apiEndpoint + '/grups/';
      if(!grup.centre) grup.centre = this.props.centre;
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': this.Auth.getToken()
          },
          body: JSON.stringify(grup)
      }).then(function(response) { 
        
        if(response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
            this.props.history.replace('/login');
        }
      }).then((grup) => {
          
          callback(grup, this);
      }).catch(function(error) {
        const status = error.response ? error.response.status : 500
        if (status === 401) {
            this.props.history.replace('/login');
        }
     });
    }

    requestDELETEGrup(grup, callback) {
      let url = config.apiEndpoint + '/grups/' + grup.key + '/';
      fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': this.Auth.getToken()
          }
      }).then(response => {
        if(response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
            this.props.history.replace('/login');
        }
      }).then((grup) => {
          callback(grup, this);
      }).catch(function(error) {
        const status = error.response ? error.response.status : 500
        if (status === 401) {
            this.props.history.replace('/login');
        }
      });
    }

    borrarGrup(grup) {
      this.requestDELETEGrup(grup, function(grup, context) {
      }); 
      let nousGrups = this.state.grups.filter(g => g.key !== grup.key);
      if(nousGrups && nousGrups.length === 1 && nousGrups[0].label.includes("Default")) {
        nousGrups[0].canView = false;
      }
      this.setState({grups: nousGrups});
    }

    crearGrup() {
      if(this.state.grup && this.state.grup != "") {
        
        this.requestPOSTGrup ({
          nom: this.state.grup, 
          curs: this.state.curs,
          centre: this.props.centre
        }, function(grup, context) {
          
          let grupChip = {
            key: Number(grup.id),
            label: grup.nom,
            canView: true
          };
          let nextGrup = context.state.countGrups + 1;
          let newGrups = context.state.grups;
          newGrups.forEach(function(g) {
            g.canView = true;
          });
          context.setState({
            grups: newGrups.concat([grupChip]), 
            countGrups: nextGrup,
            grup: ""
          });
        });
      }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <ExpansionPanel >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Grups dels cursos</Typography>
                </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                  <div className={classes.column}>
                    <Grid container>
                      <Grid item xs={12}>
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
                              helperText="Selecciona el curs acadèmic"
                              margin="normal"
                              className={classes.selectControl}
                              >
                              {this.state.cursos.map(option => (
                                  <MenuItem key={option.id} value={option.id}>
                                  {option.nom} ({option.nivell})
                                  </MenuItem>
                              ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </div>
                  </Grid>
                  <Grid item xs={12} md={8}>
                  <div className={classNames(classes.column, classes.helper)}>
                    <Grid container>
                      <Grid item xs={8}>
                      <TextField
                      autoFocus
                      margin="dense"
                      id="grup"
                      name="grup"
                      label="Grup"
                      type="text"
                      value={this.state.grup}
                      onChange={this.onChangeNomGrupInputText.bind(this)}
                      onKeyPress={ (e) => {
                        if (e.key === 'Enter') {
                          this.crearGrup();
                        }
                      }}
                      fullWidth
                      />
                      </Grid>
                      <Grid item xs={4}>
                      <Button 
                        variant="raised" 
                        color="primary" 
                        size="small" 
                        className={classes.button}
                        onClick={this.crearGrup.bind(this)}
                      >
                        Crear grup
                      </Button>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.chipContainer}>
                      <Grid item xs={12}>
                      {this.state.grups.length < 1 &&
                        <Typography variant="caption" gutterBottom>
                            El curs seleccionat no te grups associats. Pots crear-los a través d'aquest formulari.
                        </Typography>
                      }
                      <ChipsArray 
                        chipData={this.state.grups}
                        deleteChip={this.borrarGrup.bind(this)}
                      />
                      </Grid>
                    </Grid>
                  </div>
                  </Grid>
                </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
        );
    }
}

FormulariGrups.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormulariGrups);