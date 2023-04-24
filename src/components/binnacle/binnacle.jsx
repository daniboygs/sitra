import * as React from 'react';
import "../victims/style/style.css"
//import { Redirect } from 'react-router';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar, InputGroup, Alert} from 'react-bootstrap';
import { getBinnacle } from '../Service';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MDBIcon } from 'mdbreact';
import { MDBDatePicker } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import loading from '../loading/loading';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ReactNotification, {store} from 'react-notifications-component';
import '../../libs/react-pivottable/pivottable.css'
//import 'react-pivottable/pivottable.css';
import Loading from '../loading/loading';
import Table from './table';
import DatePicker from 'react-date-picker';


import 'react-notifications/lib/notifications.css';
import 'react-notifications/dist/react-notifications.css'


class Binnacle extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        victims: [],
        years: [],
        showLoading: false,
        startDate: new Date(),
        finishDate: new Date(),
        sd: this.handleChangeDateFormat(new Date())+' 00:00:00',
        fd: this.handleChangeDateFormat(new Date())+' 23:59:59',
        showOutdatedTableAlert: false,
        showTable: false,
        binnacle: [],
        queryStyle: {width: '40%', float: 'lefth', marginLeft: '30%'},
        showDateAlert: false,
        showLoading: false,
        mountedDetails: 0 
    }

    this.getStartDate = this.getStartDate.bind(this);
    this.getFinishDate = this.getFinishDate.bind(this);

    this.handleProcess = this.handleProcess.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeFinishDate = this.handleChangeFinishDate.bind(this);

    this.handleChangeDateFormat = this.handleChangeDateFormat.bind(this);

  }


  handleProcess(e){

    if(this.state.sd && this.state.fd){
      this.setState({
        showTable: false,
        showLoading: true
      });

      getBinnacle(this.state.sd, this.state.fd).then((response)=>{
        this.setState({
          binnacle: response.data,
          showTable: true,
          queryStyle: {width: '90%', float: 'lefth', marginLeft: '5%'},
          showOutdatedTableAlert: false
        });
      });
    }
    else{
      this.setState({
          showDateAlert: true
      });
      /*NotificationManager.error('Error message', 'Algo salio mal, intente de nuevo', 5000, () => {
        alert('callback');
      });*/
    }
    
  }

  getStartDate = (value) => {
      this.setState({
          startDate: value,
          sd: this.handleChangeDateFormat(value)+' 00:00:00',
          showDateAlert: false
      });
      console.log(value);
  }
  getFinishDate = (value) => {

      this.setState({
          finishDate: value,
          fd: this.handleChangeDateFormat(value)+' 23:59:59',
          showDateAlert: false
      });
      console.log(value);
  }

  handleChangeDateFormat(date){
    console.log(date)
    if(date != undefined){
      let i = String(date).split(" ");
      let month = 0;

      switch(i[1]){
        case "Jan":
          month=1;
        break;
        case "Feb":
          month=2;
        break;
        case "Mar":
          month=3;
        break;
        case "Apr":
          month=4;
        break;
        case "May":
          month=5;
        break;
        case "Jun":
          month=6;
        break;
        case "Jul":
          month=7;
        break;
        case "Aug":
          month=8;
        break;
        case "Sep":
          month=9;
        break;
        case "Oct":
          month=10;
        break;
        case "Nov":
          month=11;
        break;
        case "Dec":
          month=12;
        break;
      }

      return i[2]+'-'+month+'-'+i[3];
    }
    else{
      return null;
    }
    
  }

  handleChangeStartDate = startDate => this.setState({ startDate })

  handleChangeFinishDate = finishDate => {

    this.setState({ 
      finishDate,
      showOutdatedTableAlert: true 
    });


  }
  
  render() {
      
    return (
      <div>

        <ReactNotification />

        <h1 style={{textAlign: 'center',paddingBottom: '10px'}}><MDBIcon icon="history" /> Bitacora</h1>


        <div className="shadow-box z-depth-5" style={this.state.queryStyle}>
          <div style={{padding: 10}}>
          

          <div style={{paddingLeft: 10}}>
            <label className="queryLabel"><MDBIcon far icon="calendar-alt" />  Periodo de tiempo</label>

            <br/>
            <DatePicker
              onChange={this.getStartDate}
              value={this.state.startDate}
            />
            <MDBIcon icon="angle-right" />
            <DatePicker
              onChange={this.getFinishDate}
              value={this.state.finishDate}
            />

            <button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', textAlign: 'center', backgroundColor: '#4F5353 ', fontWeight: 'bold', color: 'white'}} onClick={()=>this.handleProcess()}><MDBIcon icon="search" /></button>

            {this.state.showDateAlert?
              <p className="queryAlert">Ingrese fechas faltantes</p>
            :null}

          </div>
          
            
            <div style={{textAlign: 'center'}}>
              
              
              <hr/>
              {this.state.showTable?
                <div>
                    {this.state.showOutdatedTableAlert?
                      <div>
                        <Alert variant="warning">
                          Tabla desactualizada!, Procese nuevamente su consulta.
                        </Alert>
                      </div>
                    :
                      null
                    }
                    
                    
                  <Table
                    showTable={this.state.showTable}
                    binnacle={this.state.binnacle}
                    callbackShowLoading={this.handleShowLoading}/>

                </div>
              :null
              }


            </div>

          </div>
          
        </div>

        <br/>
        <br/>
        
      </div>
    );
  }
}

export default Binnacle;