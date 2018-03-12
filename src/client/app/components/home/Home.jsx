import React from 'react';
import withAuth from '../functions/withAuth.jsx';
import Centres from '../centres/Centres.jsx';
import config from '../../../../../config.js';
import AuthService from '../../services/AuthService.jsx';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = { centres: [] };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        let url = config.apiEndpoint + '/centres/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((centres) => {
            let id_professor = this.Auth.getProfile().id;
            let filteredCentres = centres.filter((centre) => centre.professor === id_professor);
            this.setState({ centres: filteredCentres })
        })
    }

    addCentres(centre, index) {
        if(index) {
            if(centre) {
                let centres_aux = this.state.centres;
                centres_aux[index] = centre;
                this.setState({centres: centres_aux});
            }
        } else {
            if(centre) this.setState({centres: this.state.centres.concat([centre])});
        }
    }

    render() {
        return(
        <div>
            <Centres onAddCentres={this.addCentres.bind(this)} professor={this.Auth.getProfile().id} centres={this.state.centres}/>            
        </div>);
    }
}

export default withAuth(Home);