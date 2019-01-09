import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Res from './Res';
import News from './News';
import { changePage } from './reduxfiles/actions/index';

//import logo from './logo.svg';
import './App.css';

/*
class EventsWrapper extends Component {
  propTypes = {
    onHashChange: React.PropTypes.func
  }

}
*/

const mapDispatchToProps = dispatch => {
  return {
      changePage: (day, month, year, status) => dispatch(changePage(day, month, year, status))
  }
}

class ConnectedApp extends Component {

  /*
  constructor() {
    super();
    console.log("constructor");
  }
  */

  componentDidMount() {
    console.log("-----");
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


    /*
    window.addEventListener("hashchange", function(e){ 
      if (window.innerDocClick) {

      }
      else {
        //alert("aqui");
        console.log('hashchange1', window.location.hash);
        this.props.changePage(0,0,0,"remove");
        e.preventDefault();
      }
    });
    */
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