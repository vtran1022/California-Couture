import React, { useState, useEffect, useRef } from 'react';
import Atelier from '../Atelier.js';
import StarRating from './StarRating.jsx';


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

var characteristicBreakdown = {
  'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too big'],
  'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect',],
  'Quality': ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect',],
  'Length': ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
};


const Ratings = (props) => {
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');

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

  //render only if there has been a review
  if (Object.keys(reviews).length > 0) {
    return (<div className='review-container'>
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
          {/* main review table */}
        <table className='review-table'>
          <tbody>
            <tr><td>Stars</td><td>Date</td><td>Summary</td><td>Body</td><td>Recommended</td><td>Name</td><td>Response</td><td>Helpfulness</td></tr>
            {reviews.map(r => {
              return <ReviewTile review={r} key={r.review_id} />
            })}
          </tbody>
        </table>

        <button onClick={handleLoad}>Load More</button> <button>Add a Review</button>
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

const Breakdown = (props) => {
  const calcAverage = (data) => {
    var sum = 0;
    var ratings = 0;
    for (var number in data) {
      sum += Number(number) * Number(data[number]);
      ratings += Number(data[number]);
    }
    return (sum / ratings).toFixed(2);
  };

  const calcRecommend = (data) => {
    var t = Number(data.true);
    var f = Number(data.false);
    return Math.round(100 * (t / (t + f)));
  };

  const makeBreakdown = (data) => {
    var res = [];
    for (var stars = 5; stars >= 1; stars--) {
      res.push(<div><StarRating rating={stars} />: {data[stars]} </div>)
    }
    return res;
  };

  const makeCharacteristicBreakdown = (data) => {
    var res = [];
    for (var char in data) {
      var value = data[char].value;
      res.push(<div>{char}: {characteristicBreakdown[char][0]} <StarRating rating={value} /> {characteristicBreakdown[char][4]}</div>)
    }
    return res;
  };

  //calculate breakdown statistics
  var avg = calcAverage(props.data.ratings);
  var rec = calcRecommend(props.data.recommended);
  var bd = makeBreakdown(props.data.ratings);
  var cbd = makeCharacteristicBreakdown(props.data.characteristics);

  //render
  return (<div>
    {avg} <StarRating rating={avg} key={props.data.id} /> <br />
    {rec}% of reviewers recommend this product. <br />
    {bd} <br />
    {cbd}
  </div>);
};


export default Ratings;