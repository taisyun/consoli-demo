import { combineReducers } from 'redux'
import {
  INIT_DATA,
  ROW_EDITED,
  SET_STATE
} from '../redux/actions'

const keyColumns = [
  "ACCTCD"
]

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
      let rowKeys = {}
      keyColumns.forEach( (keyColumn) => {
        const key = action.row[keyColumn]
        if (key !== undefined) {
          rowKeys[keyColumn] = key
        }
      })
      const newItems = state.items.map( (element) => {
        const allEqual = keyColumns.reduce( (prev, keyColumn) => {
          if( !prev )  {
            return false
          }
          const key = action.row[keyColumn]
          if (key !== undefined) {
            return prev && element[keyColumn] === key
          } else {
            return false
          }
        }, true)
        if (allEqual) {
          return action.row
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
