import React, { useState } from 'react';
import StarRating from '../StarRating.jsx';

const findLS = (id) => {
  var res = localStorage.getItem('rid' + id);
  return res !== null;
};

const putLS = (id) => {
  localStorage.setItem('rid' + id, 'true');
};

const ReviewTile = (props) => {
  const [imgModal, setModal] = useState({ id: -1, url: '' });
  const [helpful, setHelpful] = useState(findLS(props.review.review_id));
  const [clicked, setClicked] = useState(false);
  var out;
  if (props.search.length >= 3) {
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

  const handleHelpful = () => {
    if (!helpful) {
      props.putHelpful(props.review.review_id);
      putLS(props.review.review_id);
      setHelpful(true);
      setClicked(true);
    } else {
      console.log('already helpful');
    }
  };
  //create row for each review tile
  return <tr >
    <td>
      <div className='review-elem'>
        <div className='review-stars'><StarRating rating={props.review.rating} key={props.review.review_id} /></div>
        <span className='tile-reviewer'>{props.review.reviewer_name}</span>
        <span className='tile-date'>{new Date(props.review.date).toLocaleDateString({},
          { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" })}</span>
        <span className='tile-summary'>{props.review.summary}</span>
        <span className='tile-body'>{out}</span>
        <span className='tile-recommend'>{props.review.recommend ? '✓ I recommend this product' : null}</span>
        {props.review.response ? <span className='tile-response'>Response: {props.review.response}</span> : null}
        <span className='tile-helpful'>Helpful? <button disabled={helpful} onClick={handleHelpful} className='helpful-button' value='Yes'>Yes</button>({props.review.helpfulness + (clicked ? 1 : 0)})</span>
        <span className='tile-images'>{props.review.photos.map(p => <img key={p.id} id={p.id} src={p.url} width={50} height={50} onClick={e => openModal(p.id, p.url)}></img>)}</span>
        {imgModal.id !== -1 ? <ImageModal img={imgModal} onClose={onClose} /> : null}
      </div>
    </td>
  </tr>;
};


const ImageModal = (props) => {
  return <img id={props.img.id} src={props.img.url} className='img-modal' alt='review image' onClick={props.onClose} />
};

export default ReviewTile;