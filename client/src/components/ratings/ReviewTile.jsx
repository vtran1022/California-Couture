import React from 'react';
import StarRating from '../StarRating.jsx';

const ReviewTile = (props) => {
  var fields = ['date', 'summary', 'body', 'recommend', 'reviewer_name', 'response', 'helpfulness'];
  var out = [];
  for (var i = 0; i < fields.length; i++) {
    out.push(JSON.stringify(props.review[fields[i]]));
  }
  //create row for each review tile
  return <tr >
    <td className='review-elem'><StarRating rating={props.review.rating} key={props.review.review_id} /></td>
    {out.map(f => <td key={f} className='review-elem'>{f}</td>)}
  </tr>;
};

export default ReviewTile;