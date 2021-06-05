import { auth } from '../../config.js';

class Atelier {
  constructor() {
    this.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
  }
  getProducts() {
    return this.fetchAPI('products');
  }
  getInfo(productId) {
    return this.fetchAPI('products/' + productId);
  }
  getStyles(productId) {
    return this.fetchAPI('products/' + productId + '/styles');
  }
  getReviewsMeta(productId) {
    return this.fetchAPI(`reviews/meta/?product_id=${productId}`);
  }

  fetchAPI(endpoint) {
    fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: new Headers({
        'Authorization': auth.TOKEN
      })
    }).then(data => data.json()).then(data => console.log(data));
  }
}

export default new Atelier();