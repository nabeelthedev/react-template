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

const authHandler = {
  isAuthenticated() {
    if (localStorage.getItem('sessionId') != null) {
      return true
    } else {
      return false
    }
  },
  authenticate(input) {
    localStorage.setItem('sessionId', 'data')
    input.redirectToReferrer()
  },
  signout(pushToSignInPage) {
    localStorage.clear()
    pushToSignInPage()
  }
}

const AuthButton = withRouter(({ history }) =>
  authHandler.isAuthenticated() ? (
    <p>
      <Link to="/">Home</Link>
      <button
        onClick={() => {
          authHandler.signout(() => history.push('/signin'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>Sign In</p>
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
    this.state = { redirectToReferrer: false, loading: false }
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } }
    from.pathname != '/'
      ? sessionStorage.setItem('from', JSON.stringify(from))
      : false
    let storedFrom = JSON.parse(sessionStorage.getItem('from'))
    storedFrom ? (from = storedFrom) : false
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />
    if (authHandler.isAuthenticated())
      return <Redirect to={{ pathname: '/' }} />

    if (this.state.loading) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <button
            onClick={() => {
              localStorage.setItem('sessionId', 'data')
              this.setState({ redirectToReferrer: true })
            }}
          >
            Log in
          </button>
        </div>
      )
    }
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href)
    const code = parsedUrl.searchParams.get('code')
    if (code) {
      this.setState({ loading: true })
      authHandler.authenticate({
        code: code,
        redirectToReferrer: () => {
          this.setState({ redirectToReferrer: true, loading: false })
        }
      })
    }
  }
}

const postData = async (url = '', data = {}) => {
  // Default options are marked with *
  let fetchResponse = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, cors, *same-origin
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          return data
        })
      }
    })
    .catch(err => {})
  return fetchResponse
}

ReactDOM.render(<Main />, document.getElementById('root'))
