import React, { useState, useEffect } from 'react';
import Atelier from '../../Atelier.js';

const ComparisonModal = ({ relatedId, trigger, product }) => {
  const [allChars, setAllChars] = useState([]);
  const [prodChars, setProd] = useState([]);
  const [relatedChars, setRelated] = useState([]);
  const [itemCheck, setCheck] = useState({ product: [], related: [] });
  const [itemName, setName] = useState({ product: 'Product 1', related: 'Product 2' });

  const fetchItems = async () => {
    let relatedData = await Atelier.getInfo(relatedId);

    const pd = product.features;
    const rd = relatedData.features;
    const all = pd.concat(rd);

    setProd(transformFeatures(pd));
    setRelated(transformFeatures(rd));
    setAllChars(transformFeatures(all));
    setName({
      product: product.name,
      related: relatedData.name
    });
  };

  const transformFeatures = (array) => {
    let transformed = [];

    array.forEach((item) => {
      item.value === null
        ? transformed.push(`${item.feature}`)
        : transformed.push(`${item.feature} ─ ${item.value}`);
    });

    return transformed;
  }

  const checkFeatures = (array1, array2) => {
    let result = [];

    array1.forEach((item) => {
      array2.includes(item)
        ? result.push('✓')
        : result.push(' ');
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
    <>
    <span data-testid='c-modal' className='c-modal' onClick={trigger}>
      <p id='c-title'>Comparing</p>
      <table>
        <thead>
          <tr>
            <th className="c-left" colSpan='2'>{itemName.product}</th>
            <th className="c-right">{itemName.related}</th>
          </tr>
        </thead>
        <tbody>
          {allChars.map((item, i) => (
            <tr key={i}>
              <td className="c-leftcol">{itemCheck.product[i]}</td>
              <td className="c-mid">{item}</td>
              <td className="c-right">{itemCheck.related[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input className='ActButton2'
             type="button"
             onClick={() => {trigger}}
             type="button"
             value='✖'
             data-testid='x-button'/>
    </span>
    </>
  )
};

export default ComparisonModal;