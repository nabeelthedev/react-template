import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'

class Main extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AuthButton />
            <hr />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/signin" component={SignIn} />
              <Redirect to={{ pathname: '/' }} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

const sessionIdExists = () => {
  if (localStorage.getItem('sessionId')) {
    return true
  } else {
    return false
  }
}

const authHandler = {
  isAuthenticated: sessionIdExists,
  authenticate(func) {
    localStorage.setItem('sessionId', '123')
    func()
  },
  signout(func) {
    localStorage.clear()
    func()
  }
}

const AuthButton = withRouter(({ history }) =>
  authHandler.isAuthenticated() ? (
    <p>
      <Link to="/">Home</Link>
      <button
        onClick={() => {
          authHandler.signout(() => history.push('/'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
)

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authHandler.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { redirectToReferrer: false }
    this.login = this.login.bind(this)
  }

  login() {
    authHandler.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } }
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />
    if (authHandler.isAuthenticated())
      return <Redirect to={{ pathname: '/' }} />

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'))
