import React, { PropTypes, Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux';
import { resetEdited, rowEdited } from '../../redux/actions'

class JobList extends Component {

  constructor(props) {
    super(props)
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    this.dataClassName = this.dataClassName.bind(this);
    this.cellEditProp = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    }
    this.columns = [
      { id: "ACCTCD", name: "Account Code", key: true, editable: false},
      { id: "ACCTSNJ", name: "Account Name", key: false, editable: false},
      { id: "DRCR_FRGNAT", name: "Amount", key: false, editable: true},
      { id: "VERSION", name: "Version", key: false, editable: false}
    ]
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
        return element.ACCTCD === this.props.lastEdited.rowId
      })
      this.lastEditedCol = this.columns.findIndex( (element) => {
        return element.id === this.props.lastEdited.columnName
      })
    }


    const cols = this.columns.map( (col) => {
      return <TableHeaderColumn key={col.id} dataField={col.id} editable={col.editable} columnClassName={col.editable ? this.dataClassName : ""} isKey={col.key}>{col.name}</TableHeaderColumn>

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

JobList.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  lastEdited: PropTypes.shape({
    rowId: PropTypes.string,
    columnName: PropTypes.string
  })
}

export default connect()(JobList);
