import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

class Main extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'))
