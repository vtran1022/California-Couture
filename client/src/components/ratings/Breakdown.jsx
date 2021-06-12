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
    for (var stars = 5; stars >= 1; stars--) {
      let i = stars;
      res.push(<div key={stars} onClick={() => props.handleFilter(i)} ><StarRating rating={stars} />: {data[stars]} {stars}</div>)
    }
    return res;
  };

  const makeCharacteristicBreakdown = (data) => {
    var res = [];
    for (var char in data) {
      var value = data[char].value;
      res.push(<div key={char}>{char}: {characteristicBreakdown[char][0]} <StarRating rating={value} /> {characteristicBreakdown[char][4]}</div>)
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

export default Breakdown;