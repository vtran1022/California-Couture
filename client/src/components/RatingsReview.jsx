import React, { useState, useEffect, useRef } from 'react';
import Atelier from '../Atelier.js';
import StarRating from './StarRating.jsx';
import Breakdown from './ratings/Breakdown.jsx';
import ReviewTile from './ratings/ReviewTile.jsx';
import FormModal from './ratings/FormModal.jsx';


const Ratings = (props) => {
  const [reviews, setReviews] = useState([]);
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
  }, [sort, props.id]);

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

  const handleForm = (e) => {
    if (!e.path.some(e => e.className === 'review-modal')) {
      props.toggleOverlay();
      setShowForm(false);
    }
  }
  useEffect(() => {
    if (showForm) {
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
    var obj = {
      product_id: Number(props.id),
      ...fd
    };
    Atelier.postAPI('reviews', obj).then(d => console.log(d)).catch(err => console.log(err));
    Atelier.clearResult('meta' + props.id);
    props.toggleOverlay();
    setShowForm(false);
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

  const clearFilters = () => {
    setFilter([false, false, false, false, false]);
    setSearch('');
  };

  var filtered = reviews.filter(review => {
    if (!filter[review.rating - 1] && !filter.every(i => !i)) {
      return false;
    }
    if (search.length >= 3) {
      var regex = '^.*' + search + '.*$';
      var re = new RegExp(regex, 'i');
      return re.test(review.body);
    }
    return true;
  });

  if (Object.keys(reviews).length > 0) {
    return (<div className='review-container'>
      {showForm ? <FormModal characteristics={props.meta.characteristics} submitData={addNewReview} productName={props.info.name} /> : null}
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
          <label htmlFor='search'>Search Reviews:</label>
          <input id='search' type='text' value={search} onChange={handleSearch}></input>
        </form>
      </div>
      <div className='list-container'>
        {/* main review table */}
        <table className='review-table'>
          <tbody>
            {filtered.map(r => {
              return <ReviewTile review={r} search={search} key={r.review_id} putHelpful={(id) => Atelier.putHelpful(id)} toggleOverlay={props.toggleOverlay} />
            })}
          </tbody>
        </table>
      </div>
      <div className='review-buttons'>
        <button onClick={handleLoad}>Load More</button>
        <button onClick={() => {
          props.toggleOverlay();
          setShowForm(true);
        }}>Add a Review</button>
        <button onClick={clearFilters}>Clear all Filters</button>
        <label> Showing {filtered.length} of {Object.values(props.meta.ratings).reduce((total, n) => Number(total) + Number(n))} reviews</label>
      </div>
      {/* product breakdown */}
      <div className='breakdown'>
        {props.meta && Object.keys(props.meta).length > 0 ? <Breakdown data={props.meta} key={props.id} handleFilter={handleFilter} filter={filter} /> : <div></div>}
      </div>
    </div>)
  } else {
    return <div>Waiting for API response.</div>
  }

};

export default Ratings;