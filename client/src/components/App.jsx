import React from 'react';
import Atelier from '../Atelier.js';
import Overview from './Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029',
      stylePath: 'lightTheme.css',
      cart: [],
      isOverlay: false
    }

    this.handleProductHighlight = this.handleProductHighlight.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);

  }

  handleProductClick(id) {
    this.setState({ product: id });
  }

  handleProductHighlight() {
    this.setState({ product: '13357' });
  }

  loadUserCart() {
    const local = window.localStorage;
    // load user cart if one exists already
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
      : local.setItem('theme', 'darkTheme.css');
  }

  componentDidMount() {
    const local = window.localStorage;

    local.getItem('theme')
      ? this.setState({ stylePath: local.getItem('theme') })
      : local.setItem('theme', this.state.stylePath);
  }

  toggleOverlay() {
    this.setState(state => {
      return {
        isOverlay: state.isOverlay ? false : true
      }
    });

    this.state.isOverlay
      ? document.getElementById("overlay").style.display = "block"
      : document.getElementById("overlay").style.display = "none";
  }

  render() {
    const {
      product,
      stylePath,
      isOverlay
    } = this.state;

    return (
      <>
        <link rel="stylesheet" type="text/css" href={stylePath} />
        <Header
          highlight={this.handleProductHighlight}
          theme={stylePath}
          toggleTheme={this.toggleTheme} />
        <Overview
          theme={stylePath}
          productId={this.state.product}
        />
        <Ratings id={this.state.product} />
        productId={ product}
        />
        <RICWidget
          productId={product}
          productClick={this.handleProductClick}
          toggleOverlay={this.toggleOverlay} />
        <Footer />
        <div id="overlay"></div>
      </>
    );
  }
};


export default App;