import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getQueryBinnacle } from '../Service';
import { MDBIcon } from 'mdbreact';
import { Button, ButtonGroup } from 'react-bootstrap';
import DetailTable from './detailTable';

class QueryTable extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        data: [],
        showModal: false,
        binnacleID: this.props.binnacleID,
        queryID: "",
        petition: ""
    }

    this.setActionButtons = this.setActionButtons.bind(this);

    this.handleCloseModal = this.handleCloseModal.bind(this);

  }

  componentDidMount(){
    if(this.props.binnacleID){
      getQueryBinnacle(this.props.binnacleID).then((response)=>{
        console.log(response.data)
          this.setState({
            data: response.data
          });
      });
    }
  }

  setActionButtons(cell, row) {
    return (
      <Button variant='warning' size="sm" onClick={()=>this.handleShowModal(row)}><MDBIcon icon="list" size="sm"/></Button>
    );
  }

  handleShowModal(row){
    console.log(row);
    if(row != "All"){
      this.setState({
        showModal: true,
        queryID: row.ConsultaID,
        petition: row.Peticion
      })
    }
    else{
      this.setState({
        showModal: true,
        queryID: "",
        petition: "All"
      })
    }
  }

  handleCloseModal(){
    this.setState({
      showModal: false,
      queryID: "",
      petition: ""
    });
  }

  render() {
    if (this.state.data) {
      return (
        <>
          {this.state.showModal?<DetailTable callbackCloseModal={this.handleCloseModal} binnacleID={this.state.binnacleID} queryID={this.state.queryID} petition={this.state.petition} showModal={this.state.showModal} ></DetailTable>: null}

          <ButtonGroup style={{padding: '10px', float: 'left'}}>
              <Button variant='success' size="sm" onClick={()=>this.handleShowModal("All")}><MDBIcon icon="list" size="sm"/></Button>
          </ButtonGroup>

          <BootstrapTable data={ this.state.data } tableStyle={{background: '#FFFFFF', padding: '10px'}}>
            <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white', textAlign: 'center' }} tdStyle={{ whiteSpace: 'normal', textAlign: 'center' }} hidden={false} width='30px' dataField="ConsultaID" isKey>
                ID
            </TableHeaderColumn>
            <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} tdStyle={{whiteSpace: 'normal', fontWeight: 'bold'}} width='200px'  dataField="Peticion" dataSort={true} filter={{type:'TextFilter'}}>
                Petición
            </TableHeaderColumn>
            <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} tdStyle={{ whiteSpace: 'normal', textAlign: 'center' }}  width='30px' dataField="button" dataFormat={this.setActionButtons.bind(this)} dataSort={true} filter={{type:'TextFilter'}}>
                Detalle
            </TableHeaderColumn>
          </BootstrapTable>
        </>
      );
    } else {
      return (<p>?</p>);
    }
  }
}

export default QueryTable;