import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RecordList from '../components/RecordList'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  render() {
    const { items, isFetching, lastUpdated, lastEdited } = this.props
    return (
      <div>
        <h1>Hrdemo</h1>
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
            <RecordList items={items} lastEdited={lastEdited} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
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

export default connect(mapStateToProps)(AsyncApp)
