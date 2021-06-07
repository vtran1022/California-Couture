import React, { useState, useEffect } from 'react';
import Atelier from '../Atelier.js';


/*
Notes:
Write new review
Reviews List
Sorting
Rating Breakdown
Product Breakdown

Reviews List:
Tiles

Review Tile:

*/


const Ratings = (props) => {
  const [reviews, setReviews] = useState({});
  //useEffect to async load reviews
  useEffect(() => {
    async function fetchAPI() {
      var res = await Atelier.getReviews(13027);
      setReviews(res);
    }
    fetchAPI();
  }, []);
  return <div>{JSON.stringify(reviews)}</div>
};

const ReviewTile = (props) => {

};


export default Ratings;