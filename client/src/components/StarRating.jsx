import React from 'react';
import star from '../imgs/star.png';

const StarRating = ({ rating }) => {
  var stars = [];
  for(var i = 0; i < 5; i++) {
    if(rating >= 1) {
      stars.push('100%');
      rating -= 1;
    } else if (rating >= 0.75) {
      stars.push('75%')
      rating -= 0.75
    } else if (rating >= 0.5) {
      stars.push('50%');
      rating -= 0.5;
    } else if (rating >= 0.25) {
      stars.push('25%');
      rating -= 0.25;
    } else {
      stars.push('0%');
    }
  }

  console.log(stars);

  return (
    <div>
      {stars.map((item, i) => (
        <div className='star-container' key={i}>
          <i className="fas fa-star" style={{'--width': item }}></i>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
