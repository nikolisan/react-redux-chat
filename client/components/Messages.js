import React, { Component } from 'react'

class Messages extends Component {
  componentDidMount() {
    console.log('Messages component didMount')
  }
  render() {
    return (
      <div>
        <h3>Messages</h3>
        <ul>
          {this.props.messages.map((item, ind) => <li key={ind}>{item.message}</li>)}
        </ul>
      </div>
    )
  }
}
export default Messages