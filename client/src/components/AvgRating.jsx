import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import Atelier from '../Atelier.js';

const AvgRating = ({ productId }) => {
  const [ratings, setRatings] = useState({});
  const [avgScore, setAverage] = useState(0);

  const averageScore = (data) => {
    let sum = 0;
    let ratings = 0;
    for (let number in data) {
      sum += Number(number) * Number(data[number]);
      ratings += Number(data[number]);
    }
    return (sum / ratings).toFixed(2);
  };

  const fetchRatings = async () => {
    const data = await Atelier.getMeta(productId);
    setRatings(data.ratings);
  };

  useEffect(() => {
    fetchRatings().catch((err) => console.log(`Error fetching ratings: ${err}`));
  }, [productId]);

  useEffect(() => {
    const ratingsVal = Object.values(ratings);
    let sum;

    ratingsVal.length !== 0
      ? sum = Math.round(ratingsVal.reduce((a, b) => Number(a) + Number(b) / ratingsVal.length)).toFixed(2)
      : null;

    sum !== 0
      ? setAverage(averageScore(ratings))
      : null;
  }, [ratings]);

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