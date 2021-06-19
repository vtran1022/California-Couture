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
      product: 13023,
      stylePath: 'lightTheme.css',
      isOverlay: false,
      isFetched: false,
      styles: []
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
          return 'OVERVIEW';
        case 'header' :
          return 'HEADER';
        case 'review-container' :
          return 'RATINGS&REVIEW'
        case 'RICWid' :
          return 'RELATED_ITEMS&COMPARISONS'
        case 'footer' :
          return 'FOOTER'
        case 'App' :
          break
        default :
          if(element.id === 'overlay') {
            return 'overlay';
          }
          return checkClasses(element.parentNode);
          break;
      }
    }
    widgetName = checkClasses(e.target);
    Atelier.logClick(elementType, widgetName, time);
  }

  handleProductClick(id) {
    this.setState({ product: id });
    this.fetchData(id);
  }

  handleProductHighlight() {
    this.setState({ product: 13357 });
    this.fetchData(13357)
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
    this.state.isOverlay
      ? document.getElementById("overlay").style.display = "block"
      : document.getElementById("overlay").style.display = "none";

    this.setState(state => {
      return {
        isOverlay: state.isOverlay ? false : true
      }
    });
  }

  render() {
    const {
      product,
      stylePath,
      isOverlay,
      related,
      productInfo,
      styles
    } = this.state;

    return (
      this.state.isFetched
      ? <>
        <link rel="stylesheet" type="text/css" href={stylePath} />
        <Header
         highlight={this.handleProductHighlight}
         theme={stylePath}
         toggleTheme={this.toggleTheme}
         onClick={this.handleGetClickInfo}/>

        <div className='App' onClick={this.handleGetClickInfo}>
          <Overview
          theme={ stylePath }
          productId={ product }
          styles={ styles }
          product={ productInfo }/>

          <RICWidget
            productId={product}
            productClick={this.handleProductClick}
            toggleOverlay={this.toggleOverlay}
            related={related}
            product={productInfo}/>

          <Ratings id={product} meta={this.state.reviews} info={this.state.productInfo} toggleOverlay={this.toggleOverlay} />

          <div id="overlay"></div>
        </div>
      <Footer onClick={this.handleGetClickInfo}/>
      </>
      : null
    );
  }
};


export default App;