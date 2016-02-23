import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Menu extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/GridView">GridView</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

