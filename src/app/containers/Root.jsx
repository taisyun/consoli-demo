import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import GridView from './GridView'
import DevTools from './DevTools'

const store = configureStore()

const routes = <Route component={App}>
    <Route path="/gridview" component={GridView} />
  </Route>

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}
