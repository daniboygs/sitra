import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Table extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        carpets: this.props.carpets,
        showWeapon: this.props.showWeapon,
        showStatus: this.props.showStatus,
        showViolent: this.props.showViolent,
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
  
  render() {
    return (
        <Row className="tableWrapper" hidden={!this.props.showTable}>
            <Col>
                <BootstrapTable pagination={true} search hover data={this.props.carpets} bordered condensed hover  tableStyle={{textAlign:'center'}} data-show-export={true} locale="zh-CN" >
                    <TableHeaderColumn hidden={true} width='80px' dataField="#" isKey>
                        #
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showStatus} width='200px'  dataField="Estatus" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                        Estatus
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showViolent} width='200px'  dataField="Cometido con violencia" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                        Cometido con violencia
                    </TableHeaderColumn>
                    <TableHeaderColumn hidden={!this.state.showWeapon} width='200px'  dataField="Tipo de arma" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
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
                </BootstrapTable>
            </Col>
        </Row>
    );
  }
}

export default Table;