import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import AvgRating from './AvgRating.jsx';
import lightLogo from '../imgs/lightLogo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029',
    }

    this.handleProductHighlight = this.handleProductHighlight.bind(this);
  }

  handleProductHighlight() {
    this.setState({ product: '13050'});
  }

  render() {
    return (
      <div>
      <nav className='navbar'>
        <img id='logo' src={lightLogo} alt='Company Logo'></img>
      </nav>
      <div className='announcement-container'>
        <span className='announcement'>
          SITE-WIDE ANNOUNCEMENT MESSAGE! ─	SALE / DISCOUNT <b>OFFER</b> ─ <u id='product-highlight' onClick={this.handleProductHighlight}>NEW PRODUCT HIGHLIGHT</u>
        </span>
      </div>
      <div>

        {/* <Overview /> */}
        {/* <Ratings id={this.state.product} /> */}
        <RICWidget
          productId={this.state.product} />
      </div>
      </div>
    );
  }
};


export default App;