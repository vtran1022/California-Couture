import React from 'react';

const StarRating = (props) => {
  //TODO: pull out star rendering to a function passed from props i.e. props.renderQuarterStar()
  const renderStar = () => '★';
  const renderThreeQuarter = () => '¾';
  const renderHalf = () => '½';
  const renderQuarter = () => '¼';
  const renderEmpty = () => '☆';

  var score = props.rating;
  var stars = [];
  for(var i = 0; i < 5; i++) {
    if(score >= 1) {
      stars.push(renderStar());
      score -= 1;
    } else if (score >= 0.75) {
      stars.push(renderThreeQuarter())
      score -= 0.75
    } else if (score >= 0.5) {
      stars.push(renderHalf());
      score -= 0.5;
    } else if (score >= 0.25) {
      stars.push(renderQuarter());
      score -= 0.25;
    } else {
      stars.push(renderEmpty());
    }
  }
  return <div>{stars}</div>
}

export default StarRating;