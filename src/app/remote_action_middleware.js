import { RESET_EDITED, SET_STATE, CHANGE_NAMESPACE } from '../redux/actions'

export default socket => store => next => action => {

  if (action.meta.sendToServer) {
    socket.emit('action', action)
  }

  return next(action)
}
