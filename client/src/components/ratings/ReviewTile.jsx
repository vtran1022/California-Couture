import React, { useState } from 'react';
import StarRating from '../StarRating.jsx';

const ReviewTile = (props) => {
  const [imgModal, setModal] = useState({ id: -1, url: '' });
  var out;
  if(props.search.length >= 3) {
    var re = RegExp('(' + props.search + ')', 'i');
    var arr = props.review.body.split(re);
    out = [];
    for (var i = 0; i < arr.length; i += 2) {
      out.push(arr[i]);
      out.push(<mark key={i}>{arr[i + 1]}</mark>)
    }
  } else {
    out = props.review.body;
  }

  const openModal = (id, url) => {
    if (imgModal.id === -1) {
      setModal({ id: id, url: url });
    }
  };
  const onClose = () => {
    setModal({ id: -1, url: '' });
  };
  //create row for each review tile
  return <tr >
    <td>
      <div className='review-elem'>
        <span><StarRating rating={props.review.rating} key={props.review.review_id} /></span>
        <span className='tile-reviewer'>{props.review.reviewer_name}</span>
        <span className='tile-date'>{new Date(props.review.date).toLocaleDateString({},
          { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" })}</span>
        <span className='tile-summary'>{props.review.summary}</span>
        <span className='tile-body'>{out}</span>
        <span className='tile-recommend'>{props.review.recommend ? '✓ I recommend this product' : null}</span>
        <span className='tile-response'>{props.review.response}</span>
        <span className='tile-helpful'>Helpful? <button onClick={() => {props.putHelpful(props.review.review_id)}} value='Yes'>Yes</button>({props.review.helpfulness})</span>
        <span className='tile-images'>{props.review.photos.map(p => <img key={p.id} id={p.id} src={p.url} width={50} height={50} onClick={e => openModal(p.id, p.url)}></img>)}</span>
        {imgModal.id !== -1 ? <ImageModal img={imgModal} onClose={onClose} /> : null}
      </div>
    </td>
  </tr>;
};


const ImageModal = (props) => {
  return <img id={props.img.id} src={props.img.url} className='modal' onClick={props.onClose} />
};
/*
{out.map((f, idx) => {
          if (fields[idx] === 'body' && props.search && props.search.length >= 3) {
            var re = RegExp(props.search);
            var arr = f.split(re);
            var out = [arr[0]];
            for (var i = 1; i < arr.length; i++) {
              out.push(<mark key={i}>{props.search}</mark>)
              out.push(arr[i]);
            }
            return <td key={f} className='review-elem'>{out}</td>
          }
          return <td key={f} className='review-elem'>{f}</td>
        })}
*/
export default ReviewTile;