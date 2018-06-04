import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';
import Main from './components/Main.jsx';
import Header from './components/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  state = {
    titol: ""
  };

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);

module.hot.accept();