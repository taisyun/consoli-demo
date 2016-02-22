import { combineReducers } from 'redux'
import {
  RESET_EDITED,
  SET_STATE
} from '../../redux/actions'

function recordList(state = {
  isFetching: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    case RESET_EDITED:
      return Object.assign({}, {
        isFetching: false,
        didInvalidate: false,
        items: state.items,
        lastEdited: {}
      })
    case SET_STATE:
      return action.state.recordList
    default:
      return state
  }
}

const rootReducer = combineReducers({
    recordList
})

export default rootReducer
