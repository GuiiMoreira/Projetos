
import { Component } from 'react';

class Counterbutton extends Component {
  state = { counter: 0 }
  increment = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
}

export default class App extends Component {
  state = { counter: 0 }
  increment = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    return (
      <>
        <div>
          <h2>{Counterbutton.state.counter}</h2>
        </div>
        <button className='counter-button' onClick={this.increment}>increment</button>

        <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>
      </>
    );
  }
}
