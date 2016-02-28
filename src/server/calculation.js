import { loadInitData, rowEdited } from '../redux/actions'

const KEY = 'ACCTCD'
const VALUE = 'DRCR_FRGNAT'

function recalculate(fnclstmt1_store, fnclstmt2_store, consolidated_store) {

  const fnclstmt1_recordList = fnclstmt1_store.getState().recordList || {}
  const fnclstmt1_items = fnclstmt1_recordList.items || []
  const fnclstmt2_recordList = fnclstmt2_store.getState().recordList || {}
  const fnclstmt2_items = fnclstmt2_recordList.items || []

  let lastEdited
  if((fnclstmt1_recordList.lastEdited || {}).date || 0 >
     (fnclstmt2_recordList.lastEdited || {}).date || 0) {
    lastEdited = fnclstmt1_recordList.lastEdited
  } else {
    lastEdited = fnclstmt2_recordList.lastEdited
  }


  console.log(`fnclstmt1_items.length=${fnclstmt1_items.length} fnclstmt2_items.length=${fnclstmt2_items.length}`)
  const result_items = []
  const items_array = [fnclstmt1_items, fnclstmt2_items]



  let last_changed_row

  items_array.forEach( (items) => {
    items.forEach( (in_item) => {

      let index = result_items.findIndex( (result_item) => {
        return result_item[KEY] != null && in_item[KEY] === result_item[KEY]
      })

      if(index === -1) {
        result_items.push(in_item)
      } else {
        const result_item = Object.assign( {}, result_items[index] )

        let value_in = in_item[VALUE]
        let value_result = result_item[VALUE]

        value_in = value_in === "" ? null : value_in
        value_result = value_result === "" ? null : value_result

        if (value_in == null && value_result == null) {
          // nop
        } else {
          value_in = +value_in || 0
          value_result = +value_result || 0
          value_result += value_in
          result_item[VALUE] = value_result
          result_items[index] = result_item
          if(lastEdited && lastEdited.rowKeys[KEY] === result_item[KEY]) {
            last_changed_row = result_item
          }
        }
      }
    })
  })

  consolidated_store.dispatch.bind(consolidated_store)(loadInitData(result_items))
  if(last_changed_row != null) {
    consolidated_store.dispatch.bind(consolidated_store)(rowEdited(last_changed_row, VALUE))
  }
}

export default function calculation(fnclstmt1_store,
    fnclstmt2_store, consolidated_store) {

  fnclstmt1_store.subscribe(
    () => {
      recalculate(fnclstmt1_store, fnclstmt2_store,
                      consolidated_store)
    }
  )

  fnclstmt2_store.subscribe(
    () => {
      recalculate(fnclstmt1_store, fnclstmt2_store,
                      consolidated_store)
    }
  )

  recalculate(fnclstmt1_store, fnclstmt2_store,
                      consolidated_store)
}
