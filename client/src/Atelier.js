import { auth } from '../../config.js';



/*********
 * To use:
 * import Atelier from '../Atelier.js';
 * then you can either use promises:
 * var styles = Atelier.getProducts().then(data => console.log(data))
 *
 * or async await style:
 * printStyles = async function () {
 *  var data = await Atelier.getProducts();
 *  console.log(data);
 * }
 */

class Atelier {
  constructor() {
    this.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
  }

  async getProducts() {
    return await this.fetchAPI('products');
  }

  async getInfo(productId) {
    return await this.fetchAPI('products/' + productId);
  }

  async getStyles(productId) {
    return await this.fetchAPI('products/' + productId + '/styles');
  }

  async getMeta(productId) {
    return await this.fetchAPI(`reviews/meta/?product_id=${productId}`);
  }

  async getReviews(productId) {
    return await this.fetchAPI(`reviews/?product_id=${productId}`)
  }

  async fetchAPI(endpoint) {
    console.log('async')
    var res = await fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: new Headers({
        'Authorization': auth.TOKEN
      })
    });
    return await res.json();
  }
}

export default new Atelier();