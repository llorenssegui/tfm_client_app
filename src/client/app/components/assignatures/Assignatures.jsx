import React from 'react';

class Assignatures extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return(
            <div>Hola mundo</div>
        );
    }

}

export default Assignatures;