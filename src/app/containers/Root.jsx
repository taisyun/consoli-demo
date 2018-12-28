import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import Menu from './Menu'
import GridView from './GridView'
import DevTools from './DevTools'

const store = configureStore()
const customHistory = createBrowserHistory();

const routes = <Route component={App}>
    <Route path="/gridview(/:recordset)(/:key)" component={GridView} />
    <Route path="/" component={Menu} />
  </Route>

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={customHistory}>{routes}</Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}
