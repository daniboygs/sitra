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
        showGener: this.props.showGener,
        showAge: this.props.showAge,
        showProfession: this.props.showProfession,
        showNationality: this.props.showNationality,
        showRelationship: this.props.showRelationship,
        showWeapon: this.props.showWeapon,
        schooling: this.props.schooling,
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
    console.log(this.props.data);
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
      gener: false,
      age: false,
      profession: false,
      nationality: false,
      relationship: false,
      weapon: false,
      schooling: false
    }
    {this.state.selectedRequests.includes("Sexo")?columns.gener=true:columns.gener=false}
    {this.state.selectedRequests.includes("Edad")?columns.age=true:columns.age=false}
    {this.state.selectedRequests.includes("Profesión")?columns.profession=true:columns.profession=false}
    {this.state.selectedRequests.includes("Nacionalidad")?columns.nationality=true:columns.nationality=false}
    {this.state.selectedRequests.includes("Parentesco")?columns.relationship=true:columns.relationship=false}
    {this.state.selectedRequests.includes("Tipo de arma")?columns.weapon=true:columns.weapon=false}
    {this.state.selectedRequests.includes("Escolaridad")?columns.schooling=true:columns.schooling=false}
    
    this.setState({
      showGener: columns.gener,
      showAge: columns.age,
      showProfession: columns.profession,
      showNationality: columns.nationality,
      showRelationship: columns.relationship,
      showWeapon: columns.weapon,
      showSchooling: columns.schooling,
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

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showGener} width='150px' dataSort={true} exportCSV filter={{type:'TextFilter'}} dataField="Sexo">
                        <strong>Sexo <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showAge} width='90px' dataSort={true} filter={{type:'TextFilter'}} dataField="Edad">
                        <strong>Edad <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showSchooling} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Escolaridad">
                        <strong>Escolaridad <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showProfession} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Profesion">
                        <strong>Profesión <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showNationality} width='150px' dataSort={true} filter={{type:'TextFilter'}} dataField="Nacionalidad">
                        <strong>Nacionalidad <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} hidden={!this.state.showRelationship} width='150px' dataSort={true} filter={{type:'TextFilter'}} dataField="Parentesco">
                        <strong>Parentesco <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
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

                    <TableHeaderColumn thStyle={{ background: this.props.headerBackground, color: this.props.headerColor }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Detenido">
                        <strong>Detenido <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" /></strong>
                    </TableHeaderColumn>

                </BootstrapTable>
            </Col>
        </Row>
    );
  }
}

export default Table;