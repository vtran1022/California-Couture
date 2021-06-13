import React, { createContext } from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import NavBar from './NavBar.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029',
      theme: 'light',
      stylePath: 'lightTheme.css'
    }

    this.handleProductHighlight = this.handleProductHighlight.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  handleProductHighlight() {
    this.setState({ product: '13050'});
  }

  toggleTheme() {
    this.setState(state => {
      return {
        theme:
          state.theme === 'dark'
          ? 'light'
          : 'dark',
        stylePath:
          state.stylePath === 'darkTheme.css'
          ? 'lightTheme.css'
          : 'darkTheme.css'
      }
    });
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
        <NavBar
          highlight={this.handleProductHighlight}
          theme={this.state.theme}/>

        <button onClick={this.toggleTheme}>Change Theme</button>
        {/* <Overview /> */}
        {/* <Ratings id={this.state.product} /> */}
        <RICWidget
          productId={this.state.product} />
      </div>
    );
  }
};


export default App;