import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Nav from './Nav'
import Recorder from '../Recorder'
import { connect } from 'react-redux'
import { creators as C } from './app_actions'

const App = ({ toggleSideNav, sideNavOpen }) => (
  <Router>
    <div>
      <Nav toggleSideNav={toggleSideNav} sideNavOpen={sideNavOpen}/>
      <Route exact path="/" component={Home}/>
      <Route path="/record" component={Recorder}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h1>Welcome</h1>
    <p>This is an application for recording background audio.</p>
  </div>
)
const mapStateToProps = (state, ownProps) => ({
  sideNavOpen: state.getIn(['app', 'sideNavOpen'], false),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSideNav: () => dispatch(C.toggleSideNav())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
