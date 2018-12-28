import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RecordList from '../components/RecordList'
import { changeNamespace } from '../../redux/actions'
import { findMeta } from '../../metadata/recordSetMetas'

class GridView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(changeNamespace(this.props.params.recordset))
  }

  render() {
    const { items, isFetching, lastUpdated, lastEdited } = this.props
    const meta = findMeta( this.props.params.recordset )
    return (
      <div>
        <h1>{meta.name_ja || ''}</h1>
        <p>
          {this.props.params.recordset &&
            <span>
              Record Set : {this.props.params.recordset} {' '}
            </span>
          }
          {this.props.params.key &&
            <span>
              Key : {this.props.params.key}
            </span>
          }
        </p>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching && items.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.length === 0 &&
          <h2>Empty.</h2>
        }
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <RecordList items={items} lastEdited={lastEdited} meta={meta}/>
          </div>
        }
      </div>
    )
  }
}

GridView.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  lastEdited: PropTypes.shape({
    rowId: PropTypes.string,
    columnName: PropTypes.string
  })
}

function mapStateToProps(state) {
  const items = ((state || {}).recordList || {}).items || []
  const copied = items.map( o => Object.assign({}, o) )
  const props = Object.assign( {}, {
    isFetching: true,
    items: []
  }, {
    isFetching: state.recordList.isFetching,
    lastUpdated: state.recordList.lastUpdated,
    items: copied,
    lastEdited: state.recordList.lastEdited
  } );

  return props
}

export default connect(mapStateToProps)(GridView)
