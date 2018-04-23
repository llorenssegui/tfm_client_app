import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    table: {
      width: '100%',
    },
    textField: {
        width: '40px'
    }
});

class TaulaAlumnes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Alumne</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>Qualificacio</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.props.alumnes.map(a => {
                    return (
                    <TableRow key={a.id}>
                        <TableCell>{a.nom} {a.congnom_1} {a.congnom_2}</TableCell>
                        <TableCell numeric>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="qualificacio"
                            name="qualificacio"
                            type="number"
                            value={10}
                            className={classes.textField}
                        />
                        </TableCell>
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