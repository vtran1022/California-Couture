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
      <h1>{slogan}</h1>
      <span>{description}</span><br></br>
      </div>

      <div className='features'>
        <span className='feature'>Features:</span>
        {features.map((feature, index) =>
          feature.value !== null
          ? <span
          key={index}
          className='feature'>
          ✓{feature.feature} - {feature.value}</span>
          : <span
          key={index}
          className='feature'>
          ✓{feature.feature}</span>)}
        </div>
      </div>
  );
}

export default Description;