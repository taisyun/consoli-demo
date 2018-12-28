import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import Menu from './Menu'
import GridView from './GridView'
import DevTools from './DevTools'

const store = configureStore()

const routes = <div>
    <Route path="/" component={App} />
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route path="/gridview/:recordset?/:key?" component={GridView} />
    </Switch>
  </div>

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>{routes}</BrowserRouter>
          <DevTools />
        </div>
      </Provider>
    )
  }
}
