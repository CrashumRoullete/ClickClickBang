import React from 'react';
import UsernameModal from './modal';

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
        <UsernameModal />
        <p>{this.state.hello}</p>
      </div>
    )
  }
}

export default Game;
