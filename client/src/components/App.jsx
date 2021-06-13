import React, { createContext } from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import NavBar from './NavBar.jsx';

// import darkTheme from '../../dist/darkTheme.css';
// import lightTheme from '../../dist/lightTheme.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029'
    }

    this.handleProductHighlight = this.handleProductHighlight.bind(this);
  }

  handleProductHighlight() {
    this.setState({ product: '13050'});
  }

  render() {
    return (
      <div>
        {/* <NavBar
          highlight={this.handleProductHighlight}/> */}
        {/* <Overview /> */}
        {/* <Ratings id={this.state.product} /> */}
        {/* <RICWidget
          productId={this.state.product} /> */}
      </div>
    );
  }
};


export default App;