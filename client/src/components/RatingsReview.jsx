import React, { useState, useEffect, useRef } from 'react';
import Atelier from '../Atelier.js';
import StarRating from './StarRating.jsx';
import Breakdown from './ratings/Breakdown.jsx';
import ReviewTile from './ratings/ReviewTile.jsx';
import FormModal from './ratings/FormModal.jsx';


/*
TODO: figure out why /reviews/meta is returning more reviews than /reviews
const higherOrderComponent = (component) => {
  return class extends React.Component {
    state = {option : 2}
    handleChange = (e) => this.setState({option: e.target.value})
    render() {
      return  (
        <React.Fragment>
          <input id="mood-range" type="range" min={0} max={4} value={this.state.option} onChange={this.handleChange} />
          <Component option={this.state.option} />
        </React.Fragment>
      )
    }
  }
};
I think we could also do this functionally:
const higherOrderComponent = (Component) => {
  return (props) => {
    const [option, setOption] = useState(2);
    handleChange = (e) => setOption(e.target.value)
      return  (
        <React.Fragment>
          <input id="mood-range" type="range" min={0} max={4} value={option} onChange={this.handleChange} />
          <Component option={option} />
        </React.Fragment>
      )
  }
};
*/



const Ratings = (props) => {
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  //effects
  //runs when the sorting method is changed, fetch reviews with new sorting methods
  useEffect(() => {
    setPage(1)
    setReviews([]);
    async function fetchAPI() {
      var res = await Atelier.getReviews(props.id, 2, 1, sort);
      //console.log('res: ' + JSON.stringify(res));
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
  }, [props.id]);

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

  if (Object.keys(reviews).length > 0) {
    return (<div className='review-container'>
      {showForm ? <FormModal characteristics={meta.characteristics} submitData={addNewReview} productName={'PLACEHOLDER'} /> : null}
      <div className='list-container'>
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
        {/* main review table */}
        <table className='review-table'>
          <tbody>
            {reviews.filter(review => {
              if (search.length < 3) {
                return true;
              }
              var regex = '^.*' + search + '.*$';
              var re = new RegExp(regex);
              return re.test(review.body);
            }).map(r => {
              return <ReviewTile review={r} search={search} key={r.review_id} />
            })}
          </tbody>
        </table>
        <button onClick={handleLoad}>Load More</button> <button onClick={() => setShowForm(!showForm)}>Add a Review</button>
      </div>
      {/* product breakdown */}
      <div className='breakdown'>
        {Object.keys(meta).length > 0 ? <Breakdown data={meta} key={props.id} /> : <div></div>}
      </div>
    </div>)
  } else {
    return <div>Waiting for API response.</div>
  }

};

export default Ratings;