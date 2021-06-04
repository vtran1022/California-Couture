import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      holder: ''
    }
  }

  render() {
    Atelier.getStyles(13027);
    return (
      <div>
        <h1>Holder</h1>
      </div>
    );
  }
};


export default App;