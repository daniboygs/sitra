import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MDBIcon } from 'mdbreact';

const tableAttr = {
  result: '',
  searchText: '',
  sortName: '',
  sortOrder: ''
}

class Table extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        data: this.props.data,
        showWeapon: this.props.showWeapon,
        showStatus: this.props.showStatus,
        showViolent: this.props.showViolent,
        selectedRequests: this.props.selectedRequests,
        show: this.props.show,
    }
    this.handleShowColumn = this.handleShowColumn.bind(this);
    this.afterSearch = this.afterSearch.bind(this);
    this.afterColumnFilter = this.afterColumnFilter.bind(this);
    this.afterTableComplete = this.handleTableComplete.bind(this);
    this.setPlaceholder = this.setPlaceholder.bind(this);
  }

  componentDidMount(){
    this.handleShowColumn();
    this.setPlaceholder();
  }

  setPlaceholder = () => {
    document.getElementsByClassName('form-control')[0].placeholder = "Buscar";

    let filterBox = document.getElementsByClassName('filter text-filter form-control');

    for (let i = 0; i < filterBox.length; i++) {
      filterBox[i].placeholder = 'Filtrar';
    }
  }

  handleShowColumn = () => {
    let columns={
      weapon: false,
      status: false,
      violent: false
    }
    {this.state.selectedRequests.includes("Tipo de arma")?columns.weapon=true:columns.weapon=false}
    {this.state.selectedRequests.includes("Estatus")?columns.status=true:columns.status=false}
    {this.state.selectedRequests.includes("Cometido con violencia")?columns.violent=true:columns.violent=false}
    
    this.setState({
      showWeapon: columns.weapon,
      showStatus: columns.status,
      showViolent: columns.violent,
      showTable: this.props.showTable
    });
  }

  afterSearch = (searchText, result) => {
    tableAttr.result = result;
  }

  afterColumnFilter = (filterConds, result) => {
    tableAttr.result = result;
  }

  handleTableComplete = () => {
    this.props.handleChangeTable(tableAttr.result);
  }
  
  render() {
    const options = {
        afterSearch: this.afterSearch,
        afterColumnFilter: this.afterColumnFilter,
        afterTableComplete: this.handleTableComplete
    };
    return (
        <Row style={ {overflow: 'auto'} } hidden={!this.props.show}>
            <Col>
                <BootstrapTable options={options} small pagination={true} search hover data={this.props.data} bordered condensed hover  tableStyle={{textAlign:'center'}} data-show-export={true} locale="zh-CN" >
                    <TableHeaderColumn hidden={true} width='80px' dataField="#" isKey>
                        #
                    </TableHeaderColumn>

                    {/*<TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showStatus} width='150px' dataSort={true} exportCSV filter={{type:'TextFilter'}} dataField="Estatus">
                        <strong>Estatus <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>*/}

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showViolent} width='90px' dataSort={true} filter={{type:'TextFilter'}} dataField="Cometido con violencia">
                        <strong>Cometido con violencia <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showWeapon} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Tipo de arma">
                        <strong>Tipo de arma <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} width='90px' dataSort={true} filter={{type:'TextFilter'}} dataField="Año">
                        <strong>Año <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} width='100px' dataSort={true} filter={{type:'TextFilter'}} dataField="Mes">
                        <strong>Mes <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Fiscalia">
                        <strong>Fiscalía <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Municipio">
                        <strong>Municipio <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Delito">
                        <strong>Delito <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                </BootstrapTable>
            </Col>
        </Row>
    );
  }
}

export default Table;