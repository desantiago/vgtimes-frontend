import React, { Component } from 'react';
import Header from './Header';
import Res from './Res';
import News from './News';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
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

export default App;
