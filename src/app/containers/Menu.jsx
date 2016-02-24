import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Menu extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/GridView/FNCLSTMT1">Non consoli FS 11000</Link></li>
          <li><Link to="/GridView/FNCLSTMT2">Non consoli FS 38184</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

