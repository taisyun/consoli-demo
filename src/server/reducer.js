import { combineReducers } from 'redux'
import {
  INIT_DATA,
  ROW_EDITED,
  SET_STATE
} from '../redux/actions'

function jobList(state = {
  isFetching: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    case INIT_DATA:
      return action.state.jobList
    case ROW_EDITED:
      const newItems = state.items.map( (element) => {
        if (element.jobId === action.row.jobId) {
          return action.row
        } else {
          return element
        }
      })

      return Object.assign({}, state.jobList, {
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        lastEdited: {
          rowId: action.row.jobId,
          columnName: action.columnName
        }
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  jobList
})

export default rootReducer
