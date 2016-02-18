import initialData from './data.json'

export const INIT_DATA = 'INIT_DATA'

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

export function loadInitData() {

  const state = Object.assign({}, {
    jobList: {
      isFetching: false,
      didInvalidate: true,
      items: initialData
    }
  })

  return dispatch => {
    return dispatch(initData(state))
  }
}

