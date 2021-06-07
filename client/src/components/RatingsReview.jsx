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
  if (Object.keys(reviews).length > 0) {
    console.log(reviews)
    return <div>
      <table>
        {reviews.results.map(r => {
          return <ReviewTile review={r} />
        })}
      </table>
    </div>
  } else {
    return <div>Waiting for API response.</div>
  }

};

const ReviewTile = (props) => {
  console.log(props.review);
  var fields = [];
  var out = [];
  for(var f in props.review) {
    out.push(props.review[f]);
  }
  return <tr>{out.map(f => <td>{JSON.stringify(f)}</td>)}</tr>;
};


export default Ratings;