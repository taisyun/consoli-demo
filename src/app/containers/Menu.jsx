import React, { Component } from 'react';
import { Link } from 'react-router'
import { recordSetMetas } from '../../constants/recordSetMetas'

export default class Menu extends Component {
  render() {
    const listItems = recordSetMetas.map( (meta) => {
        return <li key={meta.id}><Link to={"/GridView/" + meta.id}>{meta.name}</Link></li>
      }
    )
    return (
      <div>
        <h1>App</h1>
        <ul>
          {listItems}
        </ul>
        {this.props.children}
      </div>
    )
  }
}

