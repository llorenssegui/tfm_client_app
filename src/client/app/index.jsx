import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
import Header from './components/Header.jsx';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);

module.hot.accept();