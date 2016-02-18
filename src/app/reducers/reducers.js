import { combineReducers } from 'redux'
import {
  RESET_EDITED,
  SET_STATE
} from '../../redux/actions'

function jobList(state = {
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
      return action.state.jobList
    default:
      return state
  }
}

const rootReducer = combineReducers({
    jobList
})

export default rootReducer
