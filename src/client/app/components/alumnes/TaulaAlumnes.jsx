import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    table: {
      width: '100%',
    },
    textField: {
        width: '60px'
    },
    greenAvatar: {
        padding: 0,
        color: '#fff',
        backgroundColor: '#009688',
    },
    redAvatar: {
        padding: 0,
        color: '#fff',
        backgroundColor: '#F44336',
    },
});

class TaulaAlumnes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alumnes: this.props.alumnes,
            activitat: this.props.activitat
        };
        this.Auth = new AuthService();
    }

    componentWillMount () {
        let alumnes = this.props.alumnes;
        for(let i in alumnes) {
            let alumne = alumnes[i];
            if(alumne.qualificacions) {
                let qualificacions = alumne.qualificacions.filter((qualificacio) => qualificacio.activitat == this.props.activitat.id);
                alumnes[i].qualificacioActivitat = qualificacions && qualificacions.length > 0 ? Number(qualificacions[0].qualificacio) : "";
            }
        }
        this.setState({
            activitat: this.props.activitat,
            alumnes: alumnes
        })
    }

    componentWillReceiveProps (nextProps) {
        let alumnes = nextProps.alumnes;
        for(let i in alumnes) {
            let alumne = alumnes[i];
            if(alumne.qualificacions) {
                let qualificacions = alumne.qualificacions.filter((qualificacio) => qualificacio.activitat == nextProps.activitat.id);
                alumnes[i].qualificacioActivitat = qualificacions && qualificacions.length > 0 ? Number(qualificacions[0].qualificacio) : "";
            }
        }
        this.setState({
            activitat: nextProps.activitat,
            alumnes: alumnes
        })
    }

    handleChangeQualificacio (alumne, index, event) {
        let qualificacions = undefined;
        if(alumne && alumne.qualificacions) {
            qualificacions = alumne.qualificacions.filter((qualificacio) => qualificacio.activitat == this.state.activitat.id);
        }
        let idQualificacio = qualificacions && qualificacions.length > 0 ? qualificacions[0].id : undefined;
        let qualificacio = {
            qualificacio: alumne.qualificacioActivitat,
            alumne: alumne.id,
            activitat: this.state.activitat.id
        };
        let alumnes = this.state.alumnes;
        //alumnes[index].qualificacioActivitat = event.target.value !== "" ? Number(event.target.value) : "";
        
        this.setState({
            alumnes: alumnes
        });
        let metode = "POST";
        if(idQualificacio) {
            metode = "PUT";
            qualificacio.id = idQualificacio;
        }
        if(event.target.value && event.target.value !== "" && Number(event.target.value) > 0) {
            this.qualificar(qualificacio, metode, function(context, qualificacio) {
                context.props.updateQualificacio(qualificacio, index);
            });
        }
        event.stopPropagation();
    };

    changeInputQualificacio (index, event) {
        let alumnes = this.state.alumnes;
        alumnes[index].qualificacioActivitat = event.target.value !== "" ? Number(event.target.value) : "";
        this.setState({alumnes: alumnes});
    }

    qualificar (qualificacio, metode, callback) {
        let idURL = qualificacio.id ? qualificacio.id + "/" : "";
        let url = config.apiEndpoint + '/qualificacions/' + idURL; 
        fetch(url, {
            method: metode,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Auth.getToken()
            },
            body: JSON.stringify(qualificacio)
        }).then(function(response) {  
            if(response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                this.props.history.replace('/login');
            }
        }).then((qualificacio) => {
            if(callback) callback(this, qualificacio);
        }).catch(function(error) {
            const status = error.response ? error.response.status : 500
            if (status === 401) {
                this.props.history.replace('/login');
            }
        });
    }

    render() {
        const { classes } = this.props;

        return(
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Alumne</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{this.state.activitat.avaluable && "Qualificacio"}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{this.state.activitat.avaluable && ""}</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.alumnes.map((a, index) => {
                    return (
                    <TableRow key={a.id}>
                        <TableCell>{a.nom} {a.congnom_1} {a.congnom_2}</TableCell>
                        <TableCell numeric>
                        {this.state.activitat.avaluable && 
                        <TextField
                            autoFocus
                            margin="dense"
                            id="qualificacio"
                            name="qualificacio"
                            type="number"
                            value={a.qualificacioActivitat}
                            className={classes.textField}
                            onChange={(e) => this.changeInputQualificacio(index, e)}
                            onBlur={(e) => this.handleChangeQualificacio(a, index, e)}
                        />
                        }
                        </TableCell>
                        {!this.state.activitat.avaluable || a.qualificacioActivitat === "" &&
                            <TableCell numeric padding="none" />
                        }
                        {this.state.activitat.avaluable && a.qualificacioActivitat != "" && a.qualificacioActivitat >= 5 &&
                            <TableCell numeric padding="none"><Avatar className={classes.greenAvatar}>A</Avatar></TableCell>
                        }
                        {this.state.activitat.avaluable && a.qualificacioActivitat != "" && a.qualificacioActivitat < 5 &&
                            <TableCell numeric padding="none"><Avatar className={classes.redAvatar}>S</Avatar></TableCell>
                        }
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        );
    }

}

TaulaAlumnes.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(TaulaAlumnes);