import React from 'react';
import Atelier from '../Atelier.js';
// import moment from 'moment';
import Overview from './Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import StarRating from './StarRating.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13023',
      stylePath: 'lightTheme.css',
      cart: [],
      isOverlay: false,
      isFetched: false
    }

    this.handleProductHighlight = this.handleProductHighlight.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData (productId) {
    const fetchAPI = async (id) => {
      let product = await Atelier.getInfo(id);
      let styles = await Atelier.getStyles(id);
      let reviewData = await Atelier.getMeta(id);
      let related = await Atelier.getRelated(id);
      this.setState({
        productInfo: product,
        styles: styles.results,
        reviews: reviewData,
        related: related,
        isFetched: true
      });
    }
    fetchAPI(productId);
  }

  handleGetClickInfo (e) {
    var time = Date.now().toString();
    var widgetName;
    var elementType = e.target.nodeName;

    const checkClasses = (element) => {
      let currentClassNames = element.className;
      switch (currentClassNames) {
        case 'overview' :
          return widgetName = 'OVERVIEW';
        case 'header' :
          return widgetName = 'HEADER';
        case 'review-container' :
          return widgetName = 'RATINGS&REVIEW'
        case 'RICWid' :
          return widgetName = 'RELATED_ITEMS&COMPARISONS'
        case 'footer' :
          return widgetName = 'FOOTER'
        case 'App' :
          break
        default :
          checkClasses(element.parentNode);
          break;
      }
    }
    checkClasses(e.target);
    Atelier.logClick(elementType, widgetName, time);
  }

  handleProductClick(id) {
    this.setState({ product: id });
    this.fetchData(id)
  }

  handleProductHighlight() {
    this.setState({ product: '13357' });
    this.fetchData('13357')
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
    this.fetchData(this.state.product);
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
      this.state.isFetched
      ? <div className='App' onClick={this.handleGetClickInfo}>
        <link rel="stylesheet" type="text/css" href={stylePath} />
        <Header
          highlight={this.handleProductHighlight}
          theme={stylePath}
          toggleTheme={this.toggleTheme}/>
        <Overview
        theme={ stylePath }
        productId={ this.state.product }
        styles={ this.state.styles }
        product={ this.state.productInfo }/>
        <Ratings id={product} />
        <RICWidget
          productId={product}
          productClick={this.handleProductClick}
          toggleOverlay={this.toggleOverlay} />
        <Footer />
        <div id="overlay"></div>
      </div>
      : null
    );
  }
};


export default App;