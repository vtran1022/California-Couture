import React, { useState, useEffect } from 'react';
import Atelier from '../Atelier.js';
import StarRating from './StarRating.jsx';


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
    return <div className='reviews-table'>
      <table>
        <tbody>
          <tr><td>Stars</td><td>Date</td><td>Summary</td><td>Body</td><td>Recommended</td><td>Name</td><td>Response</td><td>Helpfulness</td></tr>
          { reviews.results.map(r => {
            return <ReviewTile review={r} key={r.review_id} />
          })}
        </tbody>
      </table>
      <button >Load More</button> <button>Add a Review</button>
    </div>
  } else {
    return <div>Waiting for API response.</div>
  }

};

const ReviewTile = (props) => {
  //console.log(props.review);
  var fields = ['date', 'summary', 'body', 'recommend', 'reviewer_name', 'response', 'helpfulness'];
  var out = [];
  for (var i = 0; i < fields.length; i++) {
    out.push(JSON.stringify(props.review[fields[i]]));
  }
  return <tr >
    <td className='review-elem'><StarRating rating={props.review.rating} key={props.review.review_id} /></td>
    {out.map(f => <td className='review-elem'>{f}</td>)}
    </tr>;
};


export default Ratings;