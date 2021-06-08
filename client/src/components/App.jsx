import React from 'react';
import axios from 'axios';
import OutfitList from './RIC Widget/OutfitList.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: 13030,
      idArr: [
        13027,
        13031,
        13029,
        13024,
        13023
      ]
    }

    this.handleItem = this.handleItem.bind(this);
  }

  handleItem(event) {
    this.setState({product: event.target.innerText});
  }

  render() {
    return (
      <div>
        {this.state.idArr.map((item) => (
          <div key={item} onClick={this.handleItem}>{item}</div>
        ))}
        <div>
          <OutfitList
            productId={this.state.product}/>
        </div>
      </div>
    );
  }
};


export default App;