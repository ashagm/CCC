import React, { Component } from 'react';
import './Donate.css';
import Checkout from './Checkout';

class Donate extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <Checkout
            name={'Donate Now'}
            description={'Creditcards only'}
            amount={1}
          />
        </p>
      </div>
    );
  }
}

export default Donate;
