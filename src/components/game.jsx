import React from 'react';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hello: 'Hello World!',
    }
  }
  render() {
    return(
      <div>
        <p>{this.state.hello}</p>
      </div>
    )
  }
}

export default Game;
