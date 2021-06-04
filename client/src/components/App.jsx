import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      holder: ''
    }
  }

  render() {
    return (
      <div>
        <h1>Holder</h1>
      </div>
    );
  }
};


export default App;