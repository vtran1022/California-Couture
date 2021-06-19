import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [observer, setObserver] =  useState(false);
  //oh god
  const filterRef = useRef(filter);
  const searchRef = useRef(search);


  //effects
  //runs when the sorting method is changed, fetch reviews with new sorting methods
  useEffect(() => {

    async function fetchAPI() {
      var res = await Atelier.getReviews(props.id, 1, sort);
      return res.results;
    }
    setPage(1)
    setReviews([]);
    fetchAPI().then(res => {
      setReviews(r => {
        return res;
      });
    });
  }, [sort, props.id]);

  //runs when load more is clicked, fetch the next page of reviews
  useEffect(() => {
    async function fetchAPI() {
      var res = await Atelier.getReviews(props.id, page, sort);
      return res.results;
    }
    if (page > 1) {
      fetchAPI().then(res => {
        setReviews(prev => {
          return prev.concat(res);
        });
      });
    }
  }, [page]);

  const handleForm = (e) => {
    if (!e.path.some(e => e.className === 'review-modal')) {
      props.toggleOverlay();
      setShowForm(false);
    }
  }

  //Form closing handler
  useEffect(() => {
    if (showForm) {
      window.addEventListener('click', handleForm);
      return () => {
        window.removeEventListener('click', handleForm);
      }
    }
  }, [showForm]);

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
    searchRef.current = e.target.value;
    setSearch(e.target.value);
  };

  //Filter handling
  const handleFilter = (rating) => {
    setFilter(filter => {
      var idx = rating - 1;
      filter[idx] = !filter[idx];
      filterRef.current = filter;
      return [...filter];
    });
  };

  const clearFilters = () => {
    filterRef.current = [false, false, false, false, false];
    searchRef.current = '';
    setFilter([false, false, false, false, false]);
    setSearch('');
  };

  //Infinite Scroll handling
  var handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && filterRef.current.every(f => !f) && searchRef.current === '') {
      setPage(p => p + 1);
    }
  };

  const loaderRef = useCallback(node => {
    if(!observer) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '10px',
        threshold: 0
      });
      if (node) {
        observer.observe(node);
        setObserver(true);
      }
    }
  });


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

  if (reviews.length > 0) {
    return (<div className='review-container'>
      {showForm ? <FormModal characteristics={props.meta.characteristics} submitData={addNewReview} productName={props.info.name} /> : null}
      <div className='ratings-forms'>
        <form>
          {/* sort drop down */}
          <label>Sort By: &nbsp;</label>
          <select value={sort} onChange={handleChange}>
            <option value='helpful'>Helpful</option>
            <option value='newest'>Newest</option>
            <option value='relevant'>Relevance</option>
          </select>
        </form>
        <form>
          <label htmlFor='search'>Search Reviews: &nbsp;</label>
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
        <div ref={loaderRef} />
      </div>
      <div className='review-buttons'>
        <button onClick={() => {
          props.toggleOverlay();
          setShowForm(true);
        }}>Add a Review</button>
        <button onClick={clearFilters}>Clear all Filters</button>
        <label className='add-label'> Showing {filtered.length} of {Object.values(props.meta.ratings).reduce((total, n) => Number(total) + Number(n))} reviews</label>
      </div>
      {/* product breakdown */}
      <div className='breakdown'>
        {props.meta && Object.keys(props.meta).length > 0 ? <Breakdown data={props.meta} key={props.id} handleFilter={handleFilter} filter={filter} /> : <div></div>}
      </div>
    </div>)
  } else {
    return <div >Waiting for API response.</div>
  }

};

export default Ratings;