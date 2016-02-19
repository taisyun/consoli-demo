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
      const key = action.row.ACCTCD
      const newItems = state.items.map( (element) => {
        if (key != null) {
          if (element.ACCTCD === key) {
            return action.row
          }
        }
        return element
      })

      return Object.assign({}, state.jobList, {
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        lastEdited: {
          rowId: key,
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
