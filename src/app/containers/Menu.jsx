import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { recordSetMetas } from '../../metadata/recordSetMetas'

export default class Menu extends Component {

  constructor(props) {
    super(props)
  }

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

