import React, { useState } from 'react';

var characteristicBreakdown = {
  'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too big'],
  'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect',],
  'Quality': ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect',],
  'Length': ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
};

const FormModal = (props) => {

  var charObj = {};
  for (var k in props.characteristics) {
    var id = props.characteristics[k].id;
    charObj[id] = -1;
  }
  const [formData, setData] = useState({ rating: -1, recommend: true, summary: '', body: '', name: '', email: '', photos: [], characteristics: charObj });

  const handleChange = (value, field) => {
    setData(state => {
      var s = { ...state };
      s[field] = value;
      return s;
    })
  };

  const handleCharacteristicChange = (value, name) => {
    setData(state => {
      var obj = formData.characteristics;
      obj[props.characteristics[name].id] = value;
      return { ...state, characteristics: obj };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      props.submitData(formData);
    } else {
      console.log('form failed validation');
    }
  };

  const validateForm = () => {
    //TODO: should fail if The email address provided is not in correct email format or The images selected are invalid or unable to be uploaded.
    if (
      formData.rating === -1 ||
      formData.body.length < 50 ||
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      !/^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/.test(formData.email)
    ) {
      return false;
    }
    for (var char in props.characteristics) {
      if (formData[char] === -1) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className='modal'>

      <form className='modal-form' onSubmit={handleSubmit}>
        <h2>Write Your Review</h2>
        <h4>About the {props.productName}</h4>
        <div>
          <label>Rating:</label> <RatingSelector onChange={val => handleChange(val, 'rating')} default={-1} />
          <label>{[undefined,'Poor', 'Fair', 'Average', 'Good', 'Great'][formData.rating] || null}</label>
        </div>
        <div>
          <label>Recommended:</label>
          <label>Yes</label><input type='radio' checked={formData.recommend} onChange={e => handleChange(e.target.value === 'on', 'recommend')}></input>
          <label>No</label><input type='radio' checked={!formData.recommend} onChange={e => handleChange(e.target.value === 'off', 'recommend')}></input>
        </div>
        <div>
          {Object.keys(props.characteristics).map(k => {
            return <div key={k}>
              <label>{k}:</label> <RatingSelector onChange={val => handleCharacteristicChange(val, k)} default={-1} />
              <label>{characteristicBreakdown[k][formData.characteristics[props.characteristics[k].id] - 1] || 'Select your rating for ' + k}</label>
            </div>
          })}
        </div>
        <div>
          <label>Summary:</label>
          <input type='text' placeholder='Example: Best purchase ever!' value={formData.summary} onChange={e => handleChange(e.target.value, 'summary')}></input>
        </div>
        <div>
          <label>Body:</label>
          <input type='textarea' placeholder='Why did you like the product or not?' value={formData.body} onChange={e => handleChange(e.target.value, 'body')}></input>
          <br />
          <span>{formData.body.length >= 50 ? <span>Minimum reached</span> : <span>Minimum required characters left: {50 - formData.body.length}</span>}</span>
        </div>
        <div>
          <label>Nickname:</label>
          <input type='text' placeholder='Example: jackson11!' value={formData.name} onChange={e => handleChange(e.target.value, 'name')}></input>
          <br />
          <label>For privacy reasons, do not use your full name or email address</label>
        </div>
        <div>
          <label>Email:</label>
          <input type='text' placeholder='Example: jackson11@email.com' value={formData.email} onChange={e => handleChange(e.target.value, 'email')}></input>
          <br />
          <label>For authentication reasons, you will not be emailed</label>
        </div>
        <input type='submit'></input>
      </form>
    </div>
  )
};

const RatingSelector = (props) => {
  var [checked, setChecked] = useState(props.default || 0);
  const onChange = (val) => {
    var value = Number(val);
    props.onChange(value);
    setChecked(value);
  }
  return (<div>
    <input type='radio' value='1' checked={checked === 1} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='2' checked={checked === 2} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='3' checked={checked === 3} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='4' checked={checked === 4} onChange={e => onChange(e.target.value)}></input>
    <input type='radio' value='5' checked={checked === 5} onChange={e => onChange(e.target.value)}></input>
  </div>)
};

export default FormModal;