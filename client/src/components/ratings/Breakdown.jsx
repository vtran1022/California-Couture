import React from 'react';
import StarRating from '../StarRating.jsx';

var characteristicBreakdown = {
  'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too big'],
  'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect',],
  'Quality': ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect',],
  'Length': ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
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
    var ratings = 0;
    for (var number in data) {
      ratings += Number(data[number]);
    }
    for (var stars = 5; stars >= 1; stars--) {
      let i = stars;
      let width = data[stars] ? Number(data[stars]) * 100 / ratings : 0;
      res.push(
        <span className='bd-line' key={stars} onClick={() => props.handleFilter(i)} ><div className={props.filter[i - 1] ? 'bd-line filtered' : 'bd-line'}><StarRating rating={stars} /></div>:
        <div className='review-bar'>
            <span className='review-fill' style={{ width: `${width}%` }} />
          </div>
          <label>{data[stars] || 0}</label>
          <br />
        </span>);
    }
    return res;
  };

  const makeCharacteristicBreakdown = (data) => {
    var res = [];
    for (var char in data) {
      let value = data[char].value;
      let pos = Number(value) * 60;
      res.push(
        <div key={char} className='qualities'>
          {char}: <br />
          <div className='review-indicator' style={{ marginLeft: `${pos + 5}px` }} />
          <div className='review-char-breakdown'>
            <label className='start'>{characteristicBreakdown[char][0]}</label>
            {[...Array(5).keys()].map(i => {
              return <div key={i} style={{ gridColumn: i + 1 }} className='review-char-bar' />
            })}
            <label className='end'>{characteristicBreakdown[char][4]}</label>
          </div>

        </div>
      )
    }
    return res;
  };



  //calculate breakdown statistics
  var avg = calcAverage(props.data.ratings);
  var rec = calcRecommend(props.data.recommended);
  var bd = makeBreakdown(props.data.ratings);
  var cbd = makeCharacteristicBreakdown(props.data.characteristics);

  //render
  return (<div className='review-breakdown'>
    <b className='rating-title'>Ratings Breakdown</b>
    <div>{avg} <StarRating rating={avg} key={props.data.id} /></div> <br />
    {rec}% of reviewers recommend this product. <br />
    {bd} <br />
    {cbd}
  </div>);
};

export default Breakdown;