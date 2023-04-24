import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getBinnacle} from './../Service';
import QueryTable from './queryTable';
import DetailTable from './detailTable';
import { MDBIcon } from 'mdbreact';

class Table extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        binnacle: this.props.binnacle,
        showTable: false
    }
  }

  isExpandableRow(row) {
    if (row.BitacoraID > 0) return true;
    else return false;
  }

  //<DetailTable binnacleID={row.BitacoraID} callbackShowLoading={this.props.callbackShowLoading}></DetailTable>
  expandComponent(row) {
    return (
        <DetailTable binnacleID={row.BitacoraID}></DetailTable>
    );
  }
  
  render() {
    const options = {
      //expandRowBgColor: 'rgb(236, 236, 236)'
      expandRowBgColor: 'rgb(124, 139, 158)'
    };
    return (
        <Row className="tableWrapper" hidden={!this.props.showTable}>
            <Col>
                <BootstrapTable 
                  options={ options }
                  data={this.state.binnacle}
                  expandableRow={ this.isExpandableRow }
                  expandComponent={ this.expandComponent }
                  expandColumnOptions={ { expandColumnVisible: true } } pagination={true} search hover bordered condensed hover  tableStyle={{textAlign:'center'}} data-show-export={true} locale="zh-CN" >
                    
                    <TableHeaderColumn thStyle={{ background: '#152F4A', color: 'white', textAlign: 'center' }} hidden={false} tdStyle={{ textAlign: 'center' }} width='50px' dataField="BitacoraID" isKey>
                        ID <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" />
                    </TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ background: '#152F4A', color: 'white' }} width='200px'  dataField="Fecha" dataSort={true} tdStyle={{ whiteSpace: 'normal', textAlign: 'center' }} filter={{type:'TextFilter'}}>
                        Fecha <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" />
                    </TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ background: '#152F4A', color: 'white' }} width='200px'  dataField="Dispositivo" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                        Dispositivo <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" />
                    </TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ background: '#152F4A', color: 'white' }} width='200px'  dataField="IP" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                        IP <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" />
                    </TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ background: '#152F4A', color: 'white' }} width='200px' dataSort={true} tdStyle={{ whiteSpace: 'normal', fontWeight: 'bold' }} filter={{type:'TextFilter'}} dataField="Categoria">
                        Categoría <MDBIcon icon="caret-down" /> <MDBIcon icon="caret-up" />
                    </TableHeaderColumn>

                </BootstrapTable>
            </Col>
        </Row>
    );
  }
}

export default Table;