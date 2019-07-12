import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { redirectToReferrer: false }
    this.authenticate = this.authenticate.bind(this)
  }

  render() {
    const { from } = (sessionStorage.getItem('from') !== 'undefined' &&
      JSON.parse(sessionStorage.getItem('from'))) ||
      this.props.location.state || { from: { pathname: '/' } }
    sessionStorage.setItem('from', JSON.stringify(from))

    const { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />
    if (this.isAuthenticated()) return <Redirect to={{ pathname: '/' }} />

    return (
      <div>
        <h5>Sign In</h5>
        <button onClick={this.authenticate}>Log in</button>
      </div>
    )
  }

  authenticate() {
    localStorage.setItem('sessionId', 'data')
    this.setState({ redirectToReferrer: true })
  }
  isAuthenticated() {
    return localStorage.getItem('sessionId') !== null
  }
}
