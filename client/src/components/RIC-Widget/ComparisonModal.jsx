import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';

//should receive productId from overview and productId from relatedList
const ComparisonModal = ({}) => {
  let productId = 13023;
  let relatedId = 13024;

  const [allFeatures, setAllfeatures] = useState([]);
  const [prodFeatures, setPfeatures] = useState([]);
  const [relatedFeatures, setRfeatures] = useState([]);

  const fetchItems = async () => {
    let productData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${relatedId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    const pd = productData.data.features;
    const rd = relatedData.data.features;
    const all = pd.concat(rd);

    setPfeatures(transformFeatures(pd));
    setRfeatures(transformFeatures(rd));
    setAllfeatures(transformFeatures(all));
  };

  const transformFeatures = (array) => {
    let transformed = [];

    array.forEach((item) => {
      if (item.value === null) {
        var itemStr = `${item.feature}`;
      } else {
        var itemStr = `${item.feature}: ${item.value}`;
      }
      transformed.push(itemStr);
    });

    return transformed;
  }

  useEffect(() => {
    fetchItems().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [relatedId]);

  return (
    <div className='CompModal'>
      <p>Comparing</p>
      <table>
        <th>Product 1</th>
        <th> </th>
        <th>Product 2</th>
        <tbody>
          <tr>
            <td>☑</td>
            <td>chars</td>
            <td>☑</td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
};

export default ComparisonModal;

/*
- popUp on the page
- title: "Comparing"
- comparing the current selected related product to the overview product
- table format - three columns
 1) Current product name
 2) characteristics
  - each on own line
  - facts on product or values which product has specific quantity
  - if has specific value, should display
  - if is a fact such that is 'true' for given prod, value should be displayed as checkmark
  - any char not apply, left blank
  - all should appear
  - if no overlapping w/ products, display still but no value for both prods
  - if length too long, make scrollable
   - product names fixed to top of list
 3) compared product name
*/