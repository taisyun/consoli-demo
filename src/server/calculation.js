import { loadInitData, rowEdited } from '../redux/actions'

const KEY = 'ACCTCD'
const VALUE = 'DRCR_FRGNAT'


function addOperation(value1, value2) {

  value1 = value1 === "" ? null : value1
  value2 = value2 === "" ? null : value2

  let value_result = undefined
  if (value1 == null && value2 == null) {
    // nop
  } else {
    value1 = +value1 || 0
    value2 = +value2 || 0
    value_result = value1 + value2
//    value_result = value_result === NaN ? undefined : value_result
  }
  return value_result
}

function recalculate(fnclstmt1_store, fnclstmt2_store, out_store) {

  const in_stores = [
    fnclstmt1_store,
    fnclstmt2_store
  ]

  const in_recordLists = in_stores.map( (store) => {
    return store.getState().recordList || {}
  })

  const in_items = in_recordLists.map( (recordList) => {
    return recordList.items || []
  })

  const lastEdited = in_recordLists.reduce( (prev, current) => {
    if( (prev || {}).date || 0 > (current || {}).date || 0 ) {
      return prev
    } else {
      return current
    }

  }, {})


  in_items.forEach( (item, index) => {
    console.log(`in_items[${index}].length=${item.length}`)
  })

  const result_items = []

  let last_changed_row

  in_items.forEach( (items) => {
    items.forEach( (in_item) => {

      let index = result_items.findIndex( (result_item) => {
        return result_item[KEY] != null && in_item[KEY] === result_item[KEY]
      })

      if(index === -1) {
        result_items.push(in_item)
      } else {
        const result_item = Object.assign( {}, result_items[index] )

        let value_result = addOperation(result_item[VALUE], in_item[VALUE])

        result_item[VALUE] = value_result
        result_items[index] = result_item
        if(lastEdited && lastEdited.rowKeys && lastEdited.rowKeys[KEY] === result_item[KEY]) {
          last_changed_row = result_item
        }
      }
    })
  })

  out_store.dispatch.bind(out_store)(loadInitData(result_items))
  if(last_changed_row != null) {
    out_store.dispatch.bind(out_store)(rowEdited(last_changed_row, VALUE))
  }
}

export default function calculation(fnclstmt1_store,
    fnclstmt2_store, out_store) {

  fnclstmt1_store.subscribe(
    () => {
      recalculate(fnclstmt1_store, fnclstmt2_store,
                      out_store)
    }
  )

  fnclstmt2_store.subscribe(
    () => {
      recalculate(fnclstmt1_store, fnclstmt2_store,
                      out_store)
    }
  )

  recalculate(fnclstmt1_store, fnclstmt2_store,
                      out_store)
}
