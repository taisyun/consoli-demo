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
    return (
      <div>
        <BootstrapTable data={this.props.items} cellEdit={this.cellEditProp}>
          <TableHeaderColumn dataField={this.columns[0].id} editable={false} isKey={true}>{this.columns[0].name}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.columns[1].id} editable={false}>{this.columns[1].name}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.columns[2].id} editable={true} columnClassName={this.dataClassName}>{this.columns[2].name}</TableHeaderColumn>
          <TableHeaderColumn dataField={this.columns[3].id} editable={false}>{this.columns[3].name}</TableHeaderColumn>
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
