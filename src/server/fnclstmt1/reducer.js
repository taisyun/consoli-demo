import { combineReducers } from 'redux'
import {
  INIT_DATA,
  ROW_EDITED,
  SET_STATE
} from '../../redux/actions'

const keyColumns = [
  "ACCTCD"
]

function recordList(state = {
  isFetching: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    case INIT_DATA:
      return action.state.recordList
    case ROW_EDITED:
      let rowKeys = {}
      keyColumns.forEach( (keyColumn) => {
        const key = action.row[keyColumn]
        if (key !== undefined) {
          rowKeys[keyColumn] = key
        }
      })
      const newItems = state.items.map( (element) => {
        const allEqual = keyColumns.every( (keyColumn) => {
          const key = rowKeys[keyColumn]
          if (key === undefined) {
            return false
          }
          return element[keyColumn] === key
        })
        if (allEqual) {
          return action.row
        }
        return element
      })

      return Object.assign({}, state.recordList, {
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        lastEdited: {
          rowKeys: rowKeys,
          columnName: action.columnName
        }
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  recordList
})

export default rootReducer
