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

  saveResult(tag, data) {
    sessionStorage.setItem('API' + tag, JSON.stringify(data));
  }

  getResult(tag) {
    return JSON.parse(sessionStorage.getItem('API' + tag));
  }

  clearResult(tag) {
    sessionStorage.removeItem('API' + tag);
  }


  async getProducts() {
    return await this.fetchAPI('products', 'products');
  }

  async getInfo(productId) {
    return await this.fetchAPI('products/' + productId, 'info' + productId);

  }

  async getStyles(productId) {
    return await this.fetchAPI('products/' + productId + '/styles', 'styles' + productId);
  }

  async getMeta(productId) {
    return await this.fetchAPI(`reviews/meta/?product_id=${productId}`, 'meta' + productId);
  }

  async getReviews(productId, page, sort) {
    return await this.fetchAPI(`reviews/?product_id=${productId}&page=${page}&sort=${sort}`)
  }

  async putHelpful(productId) {
    return await this.putAPI(`reviews/${productId}/helpful`);
  }

  async getRelated(productId) {
    return await this.fetchAPI(`products/${productId}/related`, 'related' + productId);
  }

  async logClick(element, widget, time) {
    return await this.postAPI('interactions', {element: element, widget: widget, time: time});
  }

  async fetchAPI(endpoint, tag) {
    var res = this.getResult(tag);
    if(res) {
      return res;
    } else {
      res = await fetch(this.baseURL + endpoint, {
        method: 'GET',
        headers: new Headers({
          'Authorization': auth.TOKEN,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      });
      var json = await res.json();
      if(tag) {
        this.saveResult(tag, json);
      }
      return json;
    }
  }

  async postAPI(endpoint, data) {
    var res = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: new Headers({
        'Authorization': auth.TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(data)
    });
    return res;
  }

  async putAPI(endpoint) {
    var res = await fetch(this.baseURL + endpoint, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': auth.TOKEN
      }),
    });
    return true;
  }
}

export default new Atelier();