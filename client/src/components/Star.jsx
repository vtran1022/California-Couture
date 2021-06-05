import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import { auth } from '../../../config.js';

class Star extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      productId: 13027,
      ratings: [],
      avgScore: 0
    }

    this._fetchRatings = this._fetchRatings.bind(this);
    this._averageScore = this._averageScore.bind(this);
  }

  _averageScore() {
    const ratings = this.state.ratings;
    const average = Math.round(ratings.reduce((a, b) => Number(a) + Number(b) / ratings.length)).toFixed(2);
    this.setState({ avgScore: average});
  }

  _fetchRatings() {
    const productId = this.state.productId;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${productId}`,
    { headers: { 'Authorization': auth.TOKEN } })
      .then((data) => {
        const ratings = Object.values(data.data.ratings);
        this.setState({ ratings: ratings });

        this._averageScore();
      })
      .catch((err) => {
        console.log(`Error fetching ratings ${err}`);
      });

  }

  render() {
    return (
      <div>
        <h1>Second Holder</h1>
        <button onClick={this._fetchRatings}>Star Rating</button>
      </div>
    );
  }
};


export default Star;