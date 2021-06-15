import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import Atelier from '../../Atelier.js';

const ComparisonModal = ({ productId, relatedId, trigger }) => {
  const [allChars, setAllChars] = useState([]);
  const [prodChars, setProd] = useState([]);
  const [relatedChars, setRelated] = useState([]);
  const [itemCheck, setCheck] = useState({ product: [], related: [] });
  const [itemName, setName] = useState({ product: 'Product 1', related: 'Product 2' });

  const fetchItems = async () => {
    let productData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let relatedData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${relatedId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    const pd = productData.data.features;
    const rd = relatedData.data.features;
    const all = pd.concat(rd);

    setProd(transformFeatures(pd));
    setRelated(transformFeatures(rd));
    setAllChars(transformFeatures(all));
    setName({
      product: productData.data.name,
      related: relatedData.data.name
    });
  };

  const transformFeatures = (array) => {
    let transformed = [];

    array.forEach((item) => {
      if (item.value === null) {
        var itemStr = `${item.feature}`;
      } else {
        var itemStr = `${item.feature} ─ ${item.value}`;
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
    setCheck({
      product: checkFeatures(allChars, prodChars),
      related: checkFeatures(allChars, relatedChars)
    });
  }, [allChars]);

  return (
    <div className='c-modal' onClick={trigger}>
      <p id='c-title'>Comparing</p>
      <table>
        <th className="c-left">{itemName.product}</th>
        <th className="c-mid"></th>
        <th className="c-right">{itemName.related}</th>
        <tbody>
          {allChars.map((item, i) => (
            <tr key={i}>
              <td className="c-left">{itemCheck.product[i]}</td>
              <td className="c-mid">{item}</td>
              <td className="c-right">{itemCheck.related[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ComparisonModal;