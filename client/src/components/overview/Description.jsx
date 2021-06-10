import React, { useState, useEffect} from 'react';

const Description = ({ currentProduct }) => {
  const [description, setDescription] = useState( currentProduct.description );
  const [features, setFeatures] = useState( currentProduct.features );
  const [slogan, setSlogan] = useState( currentProduct.slogan );

  return (
    <div className='description'>
      <h1>{slogan}</h1>
      <span>{description}</span><br></br>

      <div className='features'>
        {features.map(feature =>
          <React.Fragment>
          <span
          key={features.indexOf(feature) + 500}
          className='feature'>
            {feature.feature} - {feature.value}</span><br></br>
          </React.Fragment>
          )}
        </div>
      </div>

  );
}

export default Description;