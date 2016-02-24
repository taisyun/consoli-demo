export const INIT_DATA = 'INIT_DATA'
export const CHANGE_NAMESPACE = 'CHANGE_NAMESPACE'

export const RESET_EDITED = 'RESET_EDITED'
export const ROW_EDITED = 'ROW_EDITED'

export const SET_STATE = 'SET_STATE'

export function initData(state) {
  return {
    meta: {
      sendToServer: false,
      sendToClient: false
    },
    type: INIT_DATA,
    state
  }
}

export function changeNamespace(namespace) {
  return {
    meta: {
      sendToServer: false,
      sendToClient: false
    },
    type: CHANGE_NAMESPACE,
    namespace
  }
}

export function resetEdited() {
  return {
    meta: {
      sendToServer: false,
      sendToClient: false
    },
    type: RESET_EDITED
  }
}

export function rowEdited(row, columnName) {
  return {
    meta: {
      sendToServer: true,
      sendToClient: false
    },
    type: ROW_EDITED,
    row: row,
    columnName: columnName
  }
}

export function setState(state) {
  return {
    meta: {
      sendToServer: false,
      sendToClient: false
    },
    type: SET_STATE,
    state
  }
}

export function loadInitData(initialData) {

  const state = Object.assign({}, {
    recordList: {
      isFetching: false,
      didInvalidate: true,
      items: initialData
    }
  })


  return dispatch => {
    return dispatch(initData(state))
  }
}

