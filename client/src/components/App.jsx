import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import Header from './Header.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029',
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
        stylePath:
          state.stylePath === 'darkTheme.css'
          ? 'lightTheme.css'
          : 'darkTheme.css'
      }
    });

    const local = window.localStorage;

    this.state.stylePath === 'darkTheme.css'
    ? local.setItem('theme', 'lightTheme.css')
    : local.setItem('theme', 'darkTheme.css')

  }

  componentDidMount() {
    const local = window.localStorage;

    local.getItem('theme')
    ? this.setState({stylePath: local.getItem('theme')})
    : local.setItem('theme', this.state.stylePath)
  }

  render() {
    const {
      product,
      stylePath
    } = this.state;

    return (
      <div>
        <link rel="stylesheet" type="text/css" href={stylePath} />
        <Header
          highlight={this.handleProductHighlight}
          theme={stylePath}
          toggleTheme={this.toggleTheme}/>
        {/* <Overview /> */}
        {/* <Ratings id={this.state.product} /> */}
        <RICWidget
          productId={product} />
      </div>
    );
  }
};


export default App;