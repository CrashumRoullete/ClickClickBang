import React from 'react';

class UserList extends React.Component{
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    if (this.props.users) {
      return this.props.users.map((ele, i) => (
        <li key={i}>{ele.username}</li>
      ))
    }
  }

  render() {
    return(
      <div id="user-list">
        <ol>
          {this.renderList()}
        </ol>
      </div>
    )
  }
}

export default UserList;
