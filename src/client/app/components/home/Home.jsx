import React from 'react';
import withAuth from '../functions/withAuth.jsx';
import Centres from '../centres/Centres.jsx';
import config from '../../../../../config.js';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = { centres: [] };
    }

    componentWillMount() {
        let url = config.apiEndpoint + '/centres/';
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((centres) => {
            this.setState({ centres: centres })
        })
    }

    render() {
        return(
        <div>
            <Centres centres={this.state.centres}/>            
        </div>);
    }
}

export default withAuth(Home);