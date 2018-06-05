import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%'
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 350,
        height: 350,
    },
    center: {
        display: 'block',
        margin: '0 auto',
    }
});

class AvisLegal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={2}  />
                    <Grid item xs={8} style={{marginTop: '5%', marginBottom: "5%"}}>
                        <Typography variant="title">1. Protecció de dades</Typography>
                        <p style={{textAlign: 'justify'}}>
                            En utilitzar aquesta aplicació està autoritzant l'accés a les seves dades per proporcionar els serveis i prevenir o resoldre problemes tècnics o de servei, o per la seva sol·licitud en relació amb assumptes d'atenció al client
                            Aquest portal mantindrà mesures de seguretat administratives, físiques i tècniques adequades per a la protecció de la seguretat, confidencialitat i integritat de les seves dades.
                            El client que contracta aquesta aplicació té l'obligació legal d'inscriure el fitxer de dades a l'Agència de Protecció de Dades, segons el Reglament General de Protecció de Dades.
                        </p>
                        <Typography variant="title" style={{marginTop: '5%'}}>2. Ús de cookies</Typography>
                        <p style={{textAlign: 'justify'}}>
                        Les cookies són petits fitxers de dades o conjunt de caràcters que s'emmagatzemen en el disc dur oa la memòria temporal de l'ordinador de l'usuari quan accedeix a les pàgines de determinats llocs web. S'utilitzen perquè el servidor accedit pugui conèixer les preferències de l'usuari al tornar aquest a connectar-se. L'accés a aquesta aplicació pot implicar la utilització de cookies, que tindran per finalitat el facilitar el procés de compra online dels productes o serveis oferts, i servir la publicitat o determinats continguts o informacions jurídiques d'interès per a l'usuari. Les cookies utilitzades no poden llegir els arxius galeta creats per altres proveïdors. L'usuari té la possibilitat de configurar el seu navegador per ser avisat en pantalla de la recepció de cookies i per impedir la instal·lació de cookies al seu disc dur. Per això, l'usuari ha de consultar les instruccions i manuals del seu navegador per ampliar aquesta informació. Cap cookie permet extreure informació del disc dur de l'usuari o accedir a informació personal. Simplement associen el navegador d'un ordinador determinat a un codi anònim. L'única manera que la informació privada d'un usuari formi part d'un arxiu galeta, és que l'usuari doni personalment aquesta informació al servidor.
                        </p>
                    </Grid>
                    <Grid item xs={2}  />
                </Grid>
            </div>
        );
    }

}

AvisLegal.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AvisLegal);