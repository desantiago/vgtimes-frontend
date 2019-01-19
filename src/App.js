import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Res from './Res';
import News from './News';
import { changePage } from './reduxfiles/actions/index';

//import logo from './logo.svg';
import './App.css';

const mapDispatchToProps = dispatch => {
  return {
      changePage: (day, month, year, status) => dispatch(changePage(day, month, year, status))
  }
}

class ConnectedApp extends Component {

  componentDidMount() {
    document.onmouseover = () => {
      window.innerDocClick = true;
    }

    document.onmouseleave = () => {
      window.innerDocClick = false;
    }

    window.onhashchange = () => {
      if (window.innerDocClick) {

      }
      else {
        console.log("se presion el boton back");
        this.props.changePage(0,0,0,"remove");
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Res/>
        <News/>
      </div>
    );
  }

}

const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;