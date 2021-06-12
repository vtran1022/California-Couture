import React from 'react';
import star from '../imgs/star.png';

const StarRating = (props) => {
  //TODO: pull out star rendering to a function passed from props i.e. props.renderQuarterStar()
  // const renderStar = () => '★';
  // const renderThreeQuarter = () => '¾';
  // const renderHalf = () => '½';
  // const renderQuarter = () => '¼';
  // const renderEmpty = () => '☆';

  var score = props.rating;
  var stars = [];
  for(var i = 0; i < 5; i++) {
    if(score >= 1) {
      stars.push(1.0);
      score -= 1;
    } else if (score >= 0.75) {
      stars.push(0.75)
      score -= 0.75
    } else if (score >= 0.5) {
      stars.push(0.5);
      score -= 0.5;
    } else if (score >= 0.25) {
      stars.push(0.25);
      score -= 0.25;
    } else {
      stars.push(0);
    }
  }

  console.log(stars);

  return (
    <div>
      <h2>Stars Component</h2>
      <div>{star}</div>
        {stars.map((item, i) => {
              <div className='star-container' key={i}>
                  <div className='star-fill' style={{'width': `${parseInt(item*31)}px`}}>
                    <span>Star</span>
                      <img className='star' src={star} alt='stars alt'></img>
                  </div>
              </div>
        })}
    </div>
  );

};

export default StarRating;