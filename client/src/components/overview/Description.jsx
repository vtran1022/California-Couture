import React, { useState, useEffect} from 'react';

const Description = ({ currentProduct }) => {
  const [description, setDescription] = useState( currentProduct.description );
  const [features, setFeatures] = useState( currentProduct.features );
  const [slogan, setSlogan] = useState( currentProduct.slogan );

  useEffect(() => {
    setDescription( currentProduct.description );
    setFeatures( currentProduct.features );
    setSlogan( currentProduct.slogan );
  }, [currentProduct]);

  return (
    <div className='description-features'>
      <div className='description'>
      <h3>{slogan}</h3>
      <span>{description}</span><br></br>
      </div>

      <div className='features'>
        <b className='feature-title'>Features:</b>

        <ul>
        {features.map((feature, index) =>
          feature.value !== null
          ? <li
          key={index}
          className='feature'>
          &nbsp; {feature.feature} - {feature.value}</li>
          : <li
          key={index}
          className='feature'>
          &nbsp; {feature.feature}</li>)}
        </ul>
        </div>
      </div>
  );
}

export default Description;