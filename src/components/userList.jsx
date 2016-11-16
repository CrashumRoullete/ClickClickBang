import React from 'react'

class UserList extends React.Component {
  constructor (props) {
    super(props)
    this.renderList = this.renderList.bind(this)
  }

  renderList () {
    if (this.props.users) {
      return this.props.users.map((ele, i) => (
        <li key={i}>{ele.username}</li>
      ))
    }
  }

  render () {
    return (
      <div id='user-list'>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

export default UserList
