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

  const fetchRatings = async () => {
    let reviewData = await Atelier.getMeta(productId);

    let ratings = Object.values(reviewData.ratings);
    setRatings(ratings);

    ratings.length !== 0
      ? setAverage(averageScore(ratings))
      : null
  };

  useEffect(() => {
    fetchRatings().catch((err) => console.log(`Error fetching ratings: ${err}`));
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