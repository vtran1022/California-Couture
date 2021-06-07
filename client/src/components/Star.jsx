import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../config.js';
import starImg from '../../dist/star.png';

const Star = () => {
  const [productId, setProdId] = useState(13027);
  const [ratings, setRatings] = useState([]);
  const [avgScore, setAverage] = useState(0);

  function averageScore(array) {
    const average = Math.round(array.reduce((a, b) => Number(a) + Number(b) / array.length)).toFixed(2);
    return average;
  }

  async function fetchRatings() {
      let reviewData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${productId}`,
    { headers: { 'Authorization': auth.TOKEN } })

      let ratings = Object.values(reviewData.data.ratings);

      setRatings(ratings);
      setAverage(averageScore(ratings));
  }

  useEffect(() => {
    fetchRatings().catch((err) => console.log(`Error fetching ratings: ${err}`));
  }, [productId])

    return (
      <div>
        <h1>Second Holder</h1>
        <div>{avgScore}</div>
        <img src={starImg} alt="five stars"></img>
      </div>
    );
};


export default Star;