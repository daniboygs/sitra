import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getBinnacle, getQueryBinnacle } from '../Service';
import { Row } from 'react-bootstrap';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    if (i < 3) {
      products.push({
        id: id,
        name: 'Item name ' + id,
        price: 2100 + i,
        expand: [ {
          fieldA: 'test1',
          fieldB: (i + 1) * 99,
          fieldC: (i + 1) * Math.random() * 100,
          fieldD: '123eedd' + i
        }, {
          fieldA: 'test2',
          fieldB: i * 99,
          fieldC: i * Math.random() * 100,
          fieldD: '123eedd' + i
        } ]
      });
    } else {
      products.push({
        id: id,
        name: 'Item name ' + id,
        price: 2100 + i
      });
    }
  }
}
addProducts(5);

class BSTable extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            data: []
        }
      }

    componentDidMount(){
      if(this.props.bID){
        getQueryBinnacle(this.props.bID).then((response)=>{
          console.log(response.data)
            this.setState({
              data: response.data
            });
        });
      }
    }


  render() {
    if (this.state.data) {
      return (
        <BootstrapTable data={ this.state.data }>
          <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} hidden={false} width='200px' dataField="ConsultaID" isKey>
              ID
          </TableHeaderColumn>
          <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px'  dataField="Peticion" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
              Petición
          </TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

export default class ExpandRow extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
        data: []
    }
  }

  componentDidMount(){
    getBinnacle(this.state.startDate, this.state.finishDate).then((response)=>{
        this.setState({
          data: response.data
        });
    });
  }

  isExpandableRow(row) {
    if (row.BitacoraID > 0) return true;
    else return false;
  }

  expandComponent(row) {
    return (
      <BSTable bID={row.BitacoraID} />
    );
  }

  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
        <div>
            {this.state.data?
            
            <BootstrapTable data={ this.state.data }
            options={ options }
            expandableRow={ this.isExpandableRow }
            expandComponent={ this.expandComponent }
            expandColumnOptions={ { expandColumnVisible: true } }>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} hidden={false} width='200px' dataField="BitacoraID" isKey>
                  ID
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px'  dataField="Fecha" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                  Fecha
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px'  dataField="Dispositivo" dataSort={true} tdStyle={{ whiteSpace: 'normal' }} filter={{type:'TextFilter'}}>
                  Dispositivo
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Peticion">
                  Petición
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Caracteristica">
                  Caracteristica
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Categoria">
                  Categoria
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Tipo">
                  Tipo
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={{ background: '#113D69', color: 'white' }} width='200px' dataSort={true} filter={{type:'TextFilter'}} dataField="Descarga">
                  Descarga
              </TableHeaderColumn>
          </BootstrapTable>
        
        
        :
        null
        
        }
        </div>
      
    );
  }
}