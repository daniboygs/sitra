import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Table extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        victims: this.props.victims,
        showGener: this.props.showGener,
        showAge: this.props.showAge,
        showProfession: this.props.showProfession,
        showNationality: this.props.showNationality,
        showRelationship: this.props.showRelationship,
        showWeapon: this.props.showWeapon,
        schooling: this.props.schooling,
        selectedRequests: this.props.selectedRequests,
        showTable: false
    }

    this.handleShowColumn = this.handleShowColumn.bind(this);

  }

  componentDidMount(){
    this.handleShowColumn();
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
    {this.state.selectedRequests.includes("Detenido")?columns.schooling=true:columns.schooling=false}
    
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
        <Row className="tableWrapper" hidden={!this.props.showTable}>
            <Col>
                <BootstrapTable options={options} small pagination={true} search hover data={this.props.data} bordered condensed hover  tableStyle={{textAlign:'center'}} data-show-export={true} locale="zh-CN" >
                    <TableHeaderColumn hidden={true} width='80px' dataField="#" isKey>
                        #
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showGener} width='200px'  dataField='Sexo' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                        Sexo
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showAge} width='200px'  dataField='Edad' dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                        Edad
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showSchooling} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Escolaridad">
                        Escolaridad
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showProfession} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Profesion">
                        Profesión
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showNationality} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Nacionalidad">
                        Nacionalidad
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showRelationship} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Parentesco">
                        Parentesco
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showWeapon} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Tipo de arma">
                        Tipo de arma
                    </TableHeaderColumn>
                    <TableHeaderColumn width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Año">
                        Año
                    </TableHeaderColumn>
                    <TableHeaderColumn width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Mes">
                        Mes
                    </TableHeaderColumn>
                    <TableHeaderColumn width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Fiscalia">
                        Fiscalía
                    </TableHeaderColumn>
                    <TableHeaderColumn width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Municipio">
                        Municipio
                    </TableHeaderColumn>
                    <TableHeaderColumn width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Delito">
                        Delito
                    </TableHeaderColumn>
                    <TableHeaderColumn width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Detenido">
                        Detenido
                    </TableHeaderColumn>
                </BootstrapTable>
            </Col>
        </Row>
    );
  }
}

export default Table;