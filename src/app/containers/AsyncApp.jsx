import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import JobList from '../components/JobList'

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
            <JobList items={items} lastEdited={lastEdited} />
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
    rowId: PropTypes.number,
    columnName: PropTypes.string
  })
}

function mapStateToProps(state) {
  const items = ((state || {}).jobList || {}).items || []
  const copied = items.map( o => Object.assign({}, o) )
  const props = Object.assign( {}, {
    isFetching: true,
    items: []
  }, {
    isFetching: state.jobList.isFetching,
    lastUpdated: state.jobList.lastUpdated,
    items: copied,
    lastEdited: state.jobList.lastEdited
  } );

  return props
}

export default connect(mapStateToProps)(AsyncApp)
