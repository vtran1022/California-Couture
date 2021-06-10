import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';

//should receive productId from overview and productId from relatedList
const ComparisonModal = ({}) => {
  let productId = 13023;
  let relatedId = 13024;

  const [allChars, setAllChars] = useState([]);
  const [prodChars, setProd] = useState([]);
  const [relatedChars, setRelated] = useState([]);
  const [prodCheck, setPCheck] = useState([]);
  const [relatedCheck, setRCheck] = useState([]);
  const [prodName, setPname] = useState('Product 1');
  const [relatedName, setRname] = useState('Product 2');

  const fetchItems = async () => {
    let productData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${relatedId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    const pd = productData.data.features;
    const rd = relatedData.data.features;
    const all = pd.concat(rd);
    const pname = productData.data.name;
    const rname = relatedData.data.name;

    setProd(transformFeatures(pd));
    setRelated(transformFeatures(rd));
    setAllChars(transformFeatures(all));
    setPname(pname);
    setRname(rname);
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

  const checkFeatures = (array1, array2) => {
    let result = [];

    array1.forEach((item) => {
      if (array2.includes(item)) {
        result.push('✓');
      } else {
        result.push(' ');
      }
    });

    return result;
  }

  useEffect(() => {
    fetchItems().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [relatedId]);

  useEffect(() => {
    setPCheck(checkFeatures(allChars, prodChars));
    setRCheck(checkFeatures(allChars, relatedChars));
  }, [allChars]);

  return (
    <div className='c-modal'>
      <p>Comparing</p>
      <table>
        <th>{prodName}</th>
        <th></th>
        <th>{relatedName}</th>
        <tbody>
          {allChars.map((item, index) => (
            <tr key={index}>
              <td>{prodCheck[index]}</td>
              <td>{item}</td>
              <td>{relatedCheck[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ComparisonModal;

/*
☑
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