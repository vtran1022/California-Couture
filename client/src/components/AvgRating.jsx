import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import Atelier from '../Atelier.js';

const AvgRating = ({ productId }) => {
  const [ratings, setRatings] = useState([]);
  const [avgScore, setAverage] = useState(0);

  const averageScore = (array) => {
    const average = Math.round(array.reduce((a, b) => Number(a) + Number(b) / array.length)).toFixed(2);
    return average;
  };

  const fetchRatings = () => {
    Atelier.getMeta(productId)
      .then((data) => {
        let ratings = Object.values(data.ratings);
        setRatings(ratings);

        ratings.length !== 0
        ? setAverage(averageScore(ratings))
        : null
      })
      .catch((err) => console.log(`Error fetching ratings: ${err}`));
  };

  useEffect(() => {
    fetchRatings();
  }, [productId]);

    return (
      <>
      {avgScore
        ? <StarRating rating={avgScore}/>
        : null
      }
      </>
    );
};


export default AvgRating;