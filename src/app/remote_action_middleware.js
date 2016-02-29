import { RESET_EDITED, SET_STATE, CHANGE_NAMESPACE } from '../redux/actions'

export default socketManager => store => next => action => {

  if (action.type === CHANGE_NAMESPACE) {
    socketManager.connectToNamespace(action.namespace)
  }

  if (action.meta.sendToServer) {
    socketManager.socket.emit('action', action)
  }

  return next(action)
}
