import React, { useState, useEffect } from 'react';
import Atelier from '../Atelier.js';

const StarRating = (props) => {
  //TODO: pull out star rendering to a function passed from props i.e. props.renderQuarterStar()
  var score = props.rating;
  var stars = [];
  for(var i = 0; i < 5; i++) {
    if(score >= 1) {
      stars.push('★');
      score -= 1;
    } else if (score >= 0.75) {
      stars.push('¾')
      score -= 0.75
    } else if (score >= 0.5) {
      stars.push('½');
      score -= 0.5;
    } else if (score >= 0.25) {
      stars.push('¼');
      score -= 0.25;
    } else {
      stars.push('☆');
    }
  }
  return <div>{stars}</div>
}

export default StarRating;