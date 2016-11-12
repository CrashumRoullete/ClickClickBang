import React from 'react';
import UsernameModal from './modal';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.getUsername = this.getUsername.bind(this);
    this.state = {
      username: '',
    }
  }

  getUsername(name) {
    this.setState({ username: name });
  }

  render() {
    return(
      <div>
        <UsernameModal getUsername={this.getUsername}/>
        <p>Hello {this.state.username}</p>
      </div>
    )
  }
}

export default Game;
