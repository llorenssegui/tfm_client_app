import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    table: {
      width: '100%',
    },
    textField: {
        width: '40px'
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

class TaulaActivitats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activitats: this.props.activitats,
            alumne: this.props.alumne
        };
        this.Auth = new AuthService();
    }

    componentWillMount () {
        let activitats = this.props.activitats;
        /*for(let i in activitats) {
            let alumne = activitats[i];
            if(alumne.qualificacions) {
                let qualificacions = alumne.qualificacions.filter((qualificacio) => qualificacio.alumne == this.props.alumne.id);
                activitats[i].qualificacioAlumne = qualificacions && qualificacions.length > 0 ? qualificacions[0] : "";
            }
        }*/
        this.setState({
            alumne: this.props.alumne,
            activitats: activitats
        })
    }

    componentWillReceiveProps (nextProps) {
        let activitats = nextProps.activitats;
        /*for(let i in activitats) {
            let activitat = activitats[i];
            if(activitat.qualificacions) {
                let qualificacions = activitat.qualificacions.filter((qualificacio) => qualificacio.alumne == this.props.alumne.id);
                activitats[i].qualificacioAlumne = qualificacions && qualificacions.length > 0 ? qualificacions[0].qualificacio : "";
            }
        }*/
        this.setState({
            alumne: nextProps.alumne,
            activitats: activitats
        })
    }

    handleChangeQualificacio (alumne, index, event) {
        let qualificacions = undefined;
        if(alumne && alumne.qualificacions) {
            qualificacions = alumne.qualificacions.filter((qualificacio) => qualificacio.activitat == this.state.activitat.id);
        }
        let idQualificacio = qualificacions && qualificacions.length > 0 ? qualificacions[0].id : undefined;
        let qualificacio = {
            qualificacio: event.target.value !== "" ? Number(event.target.value) : "",
            alumne: alumne.id,
            activitat: this.state.activitat.id
        };
        let activitats = JSON.parse(JSON.stringify(this.state.activitats));
        activitats[index].qualificacioActivitat = event.target.value !== "" ? Number(event.target.value) : "";
        
        this.setState({
            activitats: activitats
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

    obtenirQualificacio (activitat, alumne, qualificacions) {
        debugger;
        for(let key in qualificacions) {
            let qualificacio = qualificacions[key];
            if(qualificacio.activitat === activitat.id && qualificacio.alumne === alumne.id) {
                return qualificacio.qualificacio;
            }
        }
        return "";
    }

    render() {
        const { classes } = this.props;

        return(
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Activitat</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>Qualificacio</TableCell>
                    <TableCell style={{ textAlign: 'right' }}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.activitats.map((a, index) => {
                    let qualificacio = this.obtenirQualificacio(a, this.state.alumne, a.qualificacions);
                    return (
                    <TableRow key={a.id}>
                        <TableCell>{a.nom}</TableCell>
                        <TableCell numeric>
                            {a.avaluable && qualificacio != "" && qualificacio}
                        </TableCell>
                        <TableCell numeric padding="none">
                            {a.avaluable && qualificacio != "" && qualificacio >= 5 &&
                            <Avatar className={classes.greenAvatar}>A</Avatar>
                            }
                            {a.avaluable && qualificacio != "" && qualificacio < 5 &&
                            <Avatar className={classes.redAvatar}>S</Avatar>
                            }
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }

}

TaulaActivitats.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(TaulaActivitats);