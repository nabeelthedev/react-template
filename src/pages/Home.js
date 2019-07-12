import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }
  render() {
    return (
      <div>
        <h5>Home</h5>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    )
  }
  signOut() {
    localStorage.clear()
    this.props.history.push('/signin')
  }
}
