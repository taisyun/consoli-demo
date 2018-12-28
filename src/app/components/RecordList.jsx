import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux';
import { resetEdited, rowEdited } from '../../redux/actions'

class RecordList extends Component {

  constructor(props) {
    super(props)
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    this.dataClassName = this.dataClassName.bind(this);
    this.cellEditProp = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    }
    this.columns = props.meta.columns
    this.keyColumns = this.columns.filter( (col) => {
      return col.key
    }).map( (col) => {
      return col.id
    })

    this.lastEditedRow = -1
    this.lastEditedCol = -1


  }

  onAfterSaveCell(row, cellName, cellValue){
    console.log("Save cell '"+cellName+"' with value '"+cellValue+"'");
    console.log("The whole row :");
    console.log(row);


    const { dispatch } = this.props
    dispatch(rowEdited(row, cellName));
  };

  dataClassName(fieldValue,data,r,i) {
    if(this.lastEditedRow !== -1 && this.lastEditedCol !== -1) {
      if(this.lastEditedRow === r && this.lastEditedCol === i) {
        return "blinking " + Math.random();
      }
    }
    return "";
  }

  render() {
    if( this.props.lastEdited ) {
      this.lastEditedRow = this.props.items.findIndex( (element) => {

        const allEqual = this.keyColumns.every( (keyColumn) => {
          if (this.props.lastEdited == null || this.props.lastEdited.rowKeys == null) {
            return false
          }
          const key = this.props.lastEdited.rowKeys[keyColumn]
          if (key === undefined) {
            return false
          }
          return element[keyColumn] === key
        })

        return allEqual
      })
      this.lastEditedCol = this.columns.findIndex( (element) => {
        return element.id === this.props.lastEdited.columnName
      })
    }


    const cols = this.columns.map( (col) => {
      return <TableHeaderColumn key={col.id} dataField={col.id} editable={col.editable} columnClassName={this.dataClassName} isKey={col.key}>{col.name}</TableHeaderColumn>

    })
    return (
      <div>
        <BootstrapTable data={this.props.items} cellEdit={this.cellEditProp}>
          {cols}
        </BootstrapTable>
      </div>
    )
  }
}

RecordList.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  meta: PropTypes.object,
  lastEdited: PropTypes.shape({
    rowId: PropTypes.string,
    columnName: PropTypes.string
  })
}

export default connect()(RecordList);
