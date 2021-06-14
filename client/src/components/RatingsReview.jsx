import React, { useState, useEffect, useRef } from 'react';
import Atelier from '../Atelier.js';
import StarRating from './StarRating.jsx';
import Breakdown from './ratings/Breakdown.jsx';
import ReviewTile from './ratings/ReviewTile.jsx';
import FormModal from './ratings/FormModal.jsx';


const Ratings = (props) => {
  const [productName, setName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([false, false, false, false, false]);

  //effects
  //runs when the sorting method is changed, fetch reviews with new sorting methods
  useEffect(() => {
    setPage(1)
    setReviews([]);
    async function fetchAPI() {
      var res = await Atelier.getReviews(props.id, 2, 1, sort);
      return res.results;
    }
    fetchAPI().then(res => {
      setReviews(res);
    });
  }, [sort]);

  //runs when load more is clicked, fetch the next page of reviews
  useEffect(() => {
    async function fetchAPI() {
      var res = await Atelier.getReviews(props.id, 2, page, sort);
      return res.results;
    }
    if (page > 1) {
      fetchAPI().then(res => {
        setReviews(reviews.concat(res));
      });
    }
  }, [page]);

  //runs when the component loads, fetch the review metadata
  useEffect(() => {
    async function fetchAPI() {
      var res = await Atelier.getMeta(props.id);
      setMeta(res);
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    async function fetchAPI() {
      var res = await Atelier.getInfo(props.id);
      console.log(res);
      setName(res.name);
    }
    fetchAPI();
  }, []);


  const handleForm = (e) => {
    if(!e.path.some(e => e.className === 'review-modal')) {
      setShowForm(false);
    }
  }
  useEffect(() => {
    if(showForm) {
      window.addEventListener('click', handleForm);
      return () => {
        window.removeEventListener('click', handleForm);
      }
    }
  }, [showForm]);

  //handle the load more button, loads the next page
  const handleLoad = () => {
    setPage(page + 1);
  };

  //handle changing the sort dropdown, load new reviews
  const handleChange = (e) => {
    setSort(e.target.value)
  };

  const addNewReview = (fd) => {
    Atelier.postAPI('reviews', {
      product_id: props.id,
      ...fd
    }).then(d => console.log(d)).catch(err => console.log(err));

  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (rating) => {
    setFilter(filter => {
      var idx = rating - 1;
      filter[idx] = !filter[idx];
      return [...filter];
    });
  };

  if (Object.keys(reviews).length > 0) {
    return (<div className='review-container'>
      {showForm ? <FormModal characteristics={meta.characteristics} submitData={addNewReview} productName={productName} /> : null}
      <div className='ratings-forms'>
        <form>
          {/* sort drop down */}
          <label>Sort by:</label>
          <select value={sort} onChange={handleChange}>
            <option value='helpful'>Helpful</option>
            <option value='newest'>Newest</option>
            <option value='relevant'>Relevance</option>
          </select>
        </form>
        <form>
          <label>Search Reviews:</label>
          <input type='text' value={search} onChange={handleSearch}></input>
        </form>
      </div>
      <div className='list-container'>
        {/* main review table */}
        <table className='review-table'>
          <tbody>
            {reviews.filter(review => {
              if (!filter[review.rating - 1] && !filter.every(i => !i)) {
                return false;
              }
              if (search.length >= 3) {
                var regex = '^.*' + search + '.*$';
                var re = new RegExp(regex, 'i');
                return re.test(review.body);
              }
              return true;
            }).map(r => {
              return <ReviewTile review={r} search={search} key={r.review_id} putHelpful={(id) => Atelier.putHelpful(id)} />
            })}
          </tbody>
        </table>
      </div>
      <div className='review-buttons'>
        <button onClick={handleLoad}>Load More</button> <button onClick={() => setShowForm(true)}>Add a Review</button>
      </div>
      {/* product breakdown */}
      <div className='breakdown'>
        {Object.keys(meta).length > 0 ? <Breakdown data={meta} key={props.id} handleFilter={handleFilter} /> : <div></div>}
      </div>
    </div>)
  } else {
    return <div>Waiting for API response.</div>
  }

};

export default Ratings;