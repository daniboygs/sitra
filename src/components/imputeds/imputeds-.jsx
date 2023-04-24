import * as React from 'react';
import "../victims/style/style.css"
//import { Redirect } from 'react-router';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar, InputGroup, Alert} from 'react-bootstrap';
import { getImputeds, getFiscalias, getQueryList, setQueryBinnacle, getIP} from '../Service';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { BookModel } from "../../../models/BookModel";
import { MDBIcon, MDBBtn } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import loading from '../loading/loading';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ReactNotification, {store} from 'react-notifications-component';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Years from '../catalogs/years';
import Fiscalias from '../catalogs/fiscalias';
import Cities from '../catalogs/cities';
import Crimes from '../catalogs/crimes';
import Requests from '../catalogs/requests';

import { CSVLink } from "react-csv";

//import PivotTableUI from 'react-pivottable/PivotTableUI';
import PivotTableUI from '../../libs/react-pivottable/PivotTableUI';
import '../../libs/react-pivottable/pivottable.css';
import TableRenderers from '../../libs/react-pivottable/TableRenderers';
//import Plot from 'react-plotly.js/factory';
import PlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from '../../libs/react-pivottable/PlotlyRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import Loading from '../loading/loading';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { Preview, print} from 'react-html2pdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js'

import PDF from '../export/pdf/pdf';
import Excel from '../export/excel/excel';

import Table from './table';
import Query from './query';

import PivotTable from './pivotTable';
import ChartTable from './chartTable';


import 'react-notifications/lib/notifications.css';
import 'react-notifications/dist/react-notifications.css'


//import createPlotlyComponent from 'react-plotly.js';
const Plot = createPlotlyComponent(window.Plotly);
// create Plotly React component via dependency injection
//const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
//const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
const data = [['attribute', 'attribute2'], ['value1', 'value2']];

const figure = {
  data: [{
    type: 'scatter',
    x: [1,2,3],
    y: [4,5,6]
  }],
  layout: {
    title: "a react-plotly.js chart"
  }
}


class Imputeds extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        imputeds: [],
        years: [],
        fiscalias: [],
        cities: [],
        crimes: [],
        requests: [],
        selectedYears: [],
        selectedFiscalias: [],
        selectedFiscaliasID: [],
        selectedCities: [],
        selectedCrimes: [],
        selectedRequests: [],
        showTable: false,
        showGener: false,
        showAge: false,
        showProfession: false,
        showNationality: false,
        showPivotTable: false,
        showLoading: false,
        /*queryStyle:{
          marginLeft: '33%', width: '40%', height: '100%', float: 'left'
        },*/
        exportTSV: "",
        tableID: false,
        tableName: "pvtTable",
        showYearsAlert: false,
        showFiscaliasAlert: false,
        showCitiesAlert: false,
        showCrimesAlert: false,
        showRequestsAlert: false,
        showOutdatedTableAlert: false,
        table: "",

        queryStyle: "queryStart",
        buttonQueryStyle: "buttonQueryStart",

        binnacleID: 0,
        showChart: false,
        pivotTableValues: []

    }

    this.fillTable = this.fillTable.bind(this);

    this.handleProcess= this.handleProcess.bind(this);
    this.handleProcessBinnacle= this.handleProcessBinnacle.bind(this);

    this.handleChangeSelectedYears = this.handleChangeSelectedYears.bind(this);
    this.handleChangeSelectedFiscalias = this.handleChangeSelectedFiscalias.bind(this);
    this.handleChangeSelectedCities = this.handleChangeSelectedCities.bind(this);
    this.handleChangeSelectedCrimes = this.handleChangeSelectedCrimes.bind(this);
    this.handleChangeSelectedRequests = this.handleChangeSelectedRequests.bind(this);
    this.handleChangePivotTable = this.handleChangePivotTable.bind(this);

    this.handleGetYears = this.handleGetYears.bind(this);
    this.handleGetFiscalias = this.handleGetFiscalias.bind(this);
    this.handleGetCities = this.handleGetCities.bind(this);
    this.handleGetCrimes = this.handleGetCrimes.bind(this);
    this.handleGetRequests = this.handleGetRequests.bind(this);

    this.handleShowTable = this.handleShowTable.bind(this);
    this.handleShowPivotTable = this.handleShowPivotTable.bind(this);

    this.renderPivotTable = this.renderPivotTable.bind(this);

    this.resetPivotTable = this.resetPivotTable.bind(this);

    this.handleShowQuery = this.handleShowQuery.bind(this);

    this.handleShowChart = this.handleShowChart.bind(this);

    this.setBinnacle = this.setBinnacle.bind(this);

    this.getOS = this.getOS.bind(this);
  }

  handleShowQuery = () => {
    this.setState({
      buttonQueryStyle: "buttonQueryStart",
      queryStyle: "queryShow"
    });
  }

  fillTable = (response) => {   
    this.setState({
      imputeds:response,
      showTable: false,
      showPivotTable: true,
      showChart: false
    });
  }

  handleShowChart = () => {
    this.resetPivotTable();

    this.setState({
      showTable: false,
      showPivotTable: false,
      showChart: true
    })
  }

  handleShowTable = () => {
    this.setState({
      showTable: true,
      showPivotTable: false,
      showChart: false,
    })
  }

  handleShowPivotTable = () => {
    this.resetPivotTable();

    this.setState({
      showTable: false,
      showPivotTable: true,
      showChart: false,
    });

    setTimeout(
      function(){
        this.setState({
          table: document.getElementById('pvtTable')
        });
      }
      .bind(this),
      100
    )
  }

    handleProcess(e){
      console.log(this.state)
      NotificationManager.info('Info message');
      /*const uuidv4 = require('uuid/v4');
      e.preventDefault();
      console.log('oeu')
      this.props.loading();
      const crimes = {
        id_crime : uuidv4(),
        name : this.state.name,
        email : this.state.email,
        status : this.state.status,
        role : this.state.role
      }*/
      //console.log(this.state.selectedCities);

      //e.preventDefault();
      //this.props.loading();
      /*const newQuery = {
        cities: this.state.selectedCities
      }*/
      

      if(this.state.selectedYears.length && this.state.selectedFiscalias.length && this.state.selectedCities.length && this.state.selectedCrimes.length && this.state.selectedRequests.length){

        this.resetPivotTable();
        
        this.setState({
          showTable: false,
          showPivotTable: false,
          showChart: false,
          showOutdatedTableAlert: false,
          showLoading: true
        });

        let request = [];
        request.push(this.state.selectedYears);
        request.push(this.state.selectedFiscalias);
        request.push(this.state.selectedCities);
        request.push(this.state.selectedCrimes);
        request.push(this.state.selectedRequests);
        console.log(request);
        getImputeds(request).then((response) => {
          console.log(response.data);
          this.fillTable(response.data);
          this.setState({
            /*queryStyle: {
              width:'20%', height:'80%', float: 'left', textAlign:"left"
            },*/
            buttonQueryStyle: "buttonQueryLoaded",
            queryStyle: "queryLoaded",
            showLoading: false
          });
          this.handleProcessBinnacle(1);
          
        }).catch(
          (error)=>{
            /*this.props.loading();
            this.props.notify('Oops something went wrong', 'error'); 
            this.handleClose();  */
            this.setState({
              showLoading: false
            });
            console.log(error);
            store.addNotification({
              title: "Error",
              message: "Algo Salio mal",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              },
              width: 300
            });
          }
        );
      }
      else{
        this.setState({
          showLoading: false
        })
        {!this.state.selectedYears.length?
          this.setState({showYearsAlert: true}):
          this.setState({showYearsAlert: false})}

        {!this.state.selectedFiscalias.length?
          this.setState({showFiscaliasAlert: true}):
          this.setState({showFiscaliasAlert: false})}
          
        {!this.state.selectedCities.length?
          this.setState({showCitiesAlert: true}):
          this.setState({showCitiesAlert: false})}

        {!this.state.selectedCrimes.length?
          this.setState({showCrimesAlert: true}):
          this.setState({showCrimesAlert: false})}

        {!this.state.selectedRequests.length?
          this.setState({showRequestsAlert: true}):
          this.setState({showRequestsAlert: false})}
          

          NotificationManager.error('Error message', 'Seleccione todos los campos faltantes', 5000, () => {
            alert('callback');
          });


          store.addNotification({
            title: "Error",
            message: "¡Campos faltantes!",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            },
            width: 300
          });
        
        /*this.props.loading();
        if(response.data == "Existent Email"){
          this.setState({
            showAlertMessage: "block",
          });
        }
        else{
          this.props.notify('User Invited Successfully', 'success');
          this.props.refreshTable();
          this.handleClose(); 
        }*/
      }
      
    }

    handleProcessBinnacle(type){

      let requestFields = [];
      var sexo=[], edad=[], escolaridad=[], profesion=[], nacionalidad=[], parentesco=[], arma=[], mes=[], año=[], fiscalia=[], municipio=[], delito=[];

      for(var k in this.state.imputeds) {
        let imputed = this.state.imputeds[k];

        if(k==0){
          for(var l in imputed){
            requestFields.push(l);
          }
        }

        if(requestFields.includes("Sexo"))(sexo.push(this.state.imputeds[k]["Sexo"]))
        if(requestFields.includes("Edad"))(edad.push(this.state.imputeds[k]["Edad"]))
        if(requestFields.includes("Escolaridad"))(escolaridad.push(this.state.imputeds[k]["Escolaridad"]))
        if(requestFields.includes("Profesion"))(profesion.push(this.state.imputeds[k]["Profesion"]))
        if(requestFields.includes("Nacionalidad"))(nacionalidad.push(this.state.imputeds[k]["Nacionalidad"]))
        if(requestFields.includes("Parentesco"))(parentesco.push(this.state.imputeds[k]["Parentesco"]))
        if(requestFields.includes("Tipo de arma"))(arma.push(this.state.imputeds[k]["Tipo de arma"]))
        if(requestFields.includes("Mes"))(mes.push(this.state.imputeds[k]["Mes"]))
        if(requestFields.includes("Año"))(año.push(this.state.imputeds[k]["Año"]))
        if(requestFields.includes("Fiscalia"))(fiscalia.push(this.state.imputeds[k]["Fiscalia"]))
        if(requestFields.includes("Municipio"))(municipio.push(this.state.imputeds[k]["Municipio"]))
        if(requestFields.includes("Delito"))(delito.push(this.state.imputeds[k]["Delito"]))

      }

      var allRequestValues = {
        Sexo: [...new Set(sexo)],
        Edad: [...new Set(edad)],
        Escolaridad: [...new Set(escolaridad)],
        Profesión: [...new Set(profesion)],
        Nacionalidad: [...new Set(nacionalidad)],
        Parentesco: [...new Set(parentesco)],
        "Tipo de arma": [...new Set(arma)],
        Mes: [...new Set(mes)],
        Año: [...new Set(año)],
        Fiscalía: [...new Set(fiscalia)],
        Municipio: [...new Set(municipio)],
        Delito: [...new Set(delito)]
      },
      realValueFilters = {
        Sexo: [],
        Edad: [],
        Escolaridad: [],
        Profesión: [],
        Nacionalidad: [],
        Parentesco: [],
        "Tipo de arma": [],
        Mes: [],
        Año: [],
        Fiscalía: [],
        Municipio: [],
        Delito: []
      },
      notValueFilters = {
        Sexo: [],
        Edad: [],
        Escolaridad: [],
        Profesión: [],
        Nacionalidad: [],
        Parentesco: [],
        "Tipo de arma": [],
        Mes: [],
        Año: [],
        Fiscalía: [],
        Municipio: [],
        Delito: []
      },
      filteredAttributes = [
        "Año", "Mes", "Fiscalía", "Municipio", "Delito"
      ]

      this.state.selectedRequests.forEach(request => {
        filteredAttributes.push(request);
      });

      getIP().then((response) => {
        console.log(response.data);
        this.setBinnacle(allRequestValues, filteredAttributes, realValueFilters, notValueFilters, type, response.data);
      }).catch(
        (error)=>{
          console.log(error);
          this.setBinnacle(allRequestValues, filteredAttributes, realValueFilters, notValueFilters, "");
        }
      );

    }

    setBinnacle(allRequestValues, filteredAttributes, realValueFilters, notValueFilters, type, geoplugin){

      if(this.state.valueFilter && type==3){

        for(var m in this.state.valueFilter){
          for(var n in this.state.valueFilter[m]){
            notValueFilters[m].push(n);
          }
        }

        filteredAttributes.forEach(attribute => {
          
          allRequestValues[attribute].forEach(value => {
            if((notValueFilters[attribute])&&(!notValueFilters[attribute].includes(value))){
              realValueFilters[attribute].push(value);
            }
          });

        });

        //download button
      
        {this.state.binnacleID!=0?
          setQueryBinnacle(realValueFilters, this.getOS(), filteredAttributes, this.state.binnacleID, 1, 3, geoplugin):
          setQueryBinnacle(realValueFilters, this.getOS(), filteredAttributes, 0, 1, 3, geoplugin);
        }

        console.log(realValueFilters);

      }
      else if(type==2){
        //download all values button

        {this.state.binnacleID!=0?
          setQueryBinnacle(allRequestValues, this.getOS(), filteredAttributes, this.state.binnacleID, 1, 3, geoplugin):
          setQueryBinnacle(allRequestValues, this.getOS(), filteredAttributes, 0, 1, 3, geoplugin);
        }

        console.log(allRequestValues);

      }
      else if(type==1){
        //accept button

        this.setState({
          binnacleID: 0
        });

        setQueryBinnacle(allRequestValues, this.getOS(), filteredAttributes, 0, 0, 3, geoplugin).then((response) => {
          this.setState({
            binnacleID: response.data
          });
          console.log(response.data);
        }).catch(
          (error)=>{
            console.log(error);
          }
        );

        console.log(allRequestValues);

      }

    }

    getOS(){
      switch(navigator.platform){
        case 'Linux aarch64':
          return 'Linux';
        case 'Linux armv5tejl':
          return 'Linux';
        case 'Linux armv6l':
          return 'Linux';
        case 'Linux armv7l':
          return 'Linux';
        case 'Linux i686':
          return 'Linux';
        case 'Linux i686 on x86_64':
          return 'Linux';
        case 'Linux i686 X11':
          return 'Linux';
        case 'Linux MSM8960_v3.2.1.1_N_R069_Rev:18':
          return 'Linux';
        case 'Linux ppc64':
          return 'Linux';
        case 'Linux x86_64':
          return 'Linux';
        case 'Linux x86_64 X11':
          return 'Linux';
        case 'Mac68K':
          return 'Macintosh';
        case 'MacPPC':
          return 'Macintosh';
        case 'MacIntel':
          return 'Macintosh';
        case 'Pike v7.6 release 92':
          return 'iPhone';
        case 'Pike v7.8 release 517':
          return 'iPhone';
        case 'Win16':
          return 'Windows';
        case 'Win32':
          return 'Windows';
        case 'WinCE':
          return 'Windows';
        case 'SunOS i86pc':
          return 'SunOS';
        case 'SunOS sun4u':
          return 'SunOS';
        case 'OpenBSD amd64':
          return 'OpenBSD';
        default:
          return navigator.platform;
      }
    }

      handleChangeSelectedYears = (selectedYears) => {
        this.setState({
          selectedYears: selectedYears,
          showYearsAlert: false,
          showOutdatedTableAlert: true
        })
      }

      handleChangeSelectedFiscalias = (selectedFiscalias, selectedFiscaliasID) => {
        this.setState({
          selectedFiscalias: selectedFiscalias,
          selectedFiscaliasID: selectedFiscaliasID,
          showFiscaliasAlert: false,
          showOutdatedTableAlert: true
        })
        if(selectedFiscaliasID.length){
          this.setCitiesById(selectedFiscaliasID);
        }
        console.log(selectedFiscaliasID);
      }

      callbackSetCitiesById = (setCitiesById) =>{
        this.setCitiesById = setCitiesById;
      }

      handleChangeSelectedCities = (selectedCities) => {
        this.setState({
          selectedCities: selectedCities,
          showCitiesAlert: false,
          showOutdatedTableAlert: true
        })
      }
      
      handleChangeSelectedCrimes = (selectedCrimes) => {
        this.setState({
          selectedCrimes: selectedCrimes,
          showCrimesAlert: false,
          showOutdatedTableAlert: true
        })
      }

      handleChangeSelectedRequests = (selectedRequests) => {
        this.setState({
          selectedRequests: selectedRequests,
          showRequestsAlert: false,
          showOutdatedTableAlert: true
        });
      }

      handleGetYears = (years) => {
        this.setState({
          years: years
        })
      }

      handleGetFiscalias = (fiscalias) => {
        this.setState({
          fiscalias: fiscalias
        })
      }

      handleGetCities = (cities) => {
        this.setState({
          cities: cities
        })
      }
      
      handleGetCrimes = (crimes) => {
        this.setState({
          crimes: crimes
        })
      }

      handleGetRequests = (requests) => {
        this.setState({
          requests: requests
        })
      }

      handleChangePivotTable = (data) => {
        if(data != undefined){
          setTimeout(
            function(){
              this.setState({
                pivotTableValues: data,
                table: document.getElementById('pvtTable')
              });
            }
            .bind(this),
            300
          );
        }
        else{
          setTimeout(
            function(){
              this.setState({
                table: document.getElementById('pvtTable')
              });
            }
            .bind(this),
            300
          );
        }
      }

      /*<MDBIcon icon="envelope" className="customClass" ></MDBIcon>*/

      /* Alert

      {this.state.showRequestsAlert?
            <Alert variant="danger">
              <strong>Campo Vacío!</strong> Seleccione alguna opción
            </Alert>: null}

      */

      renderPivotTable () {
        if(this.state.showPivotTable){
        
          return (
            <PivotTable pivotTableValues={this.state.pivotTableValues} handleChangePivotTable={this.handleChangePivotTable} imputeds={this.state.imputeds} handleGetPivotTable={this.handleChangePivotTable}></PivotTable>
          )
        }
        else if(this.state.showChart){
        
          return (
            <ChartTable pivotTableValues={this.state.pivotTableValues} handleChangePivotTable={this.handleChangePivotTable} imputeds={this.state.imputeds}></ChartTable>
          )
        }
        else{
          return (null);
        }
      }

      resetPivotTable (){
        this.setState({
          aggregatorName: "Contar",
          cols: ['Año'],
          data: this.state.victims,
          rendererName: "Tabla",
          rows: ['Delito'],
          sorters: {},
          tableOptions: {},
          vals: [],
          valueFilter: {}
        })
      }
  
  render() {
      
    return (
      <div>

        {
          !(this.state.years.length && 
          this.state.fiscalias.length &&
          this.state.crimes.length && 
          this.state.requests.length) || this.state.showLoading
          ?
          <Loading/>
          :null
        }

        <ReactNotification />

        <Button id={this.state.buttonQueryStyle} variant='success' onClick={()=>this.handleShowQuery()}>Nueva Consulta</Button>

        <Query
          handleChangeSelectedRequests={this.handleChangeSelectedRequests} 
          handleChangeSelectedYears={this.handleChangeSelectedYears}
          handleChangeSelectedFiscalias={this.handleChangeSelectedFiscalias}
          handleChangeSelectedCities={this.handleChangeSelectedCities}
          handleChangeSelectedCrimes={this.handleChangeSelectedCrimes}
          handleGetRequests={this.handleGetRequests}
          handleGetYears={this.handleGetYears}
          handleGetFiscalias={this.handleGetFiscalias}
          handleGetCities={this.handleGetCities}
          handleGetCrimes={this.handleGetCrimes}
          handleProcess={this.handleProcess}
          showYearsAlert={this.state.showYearsAlert}
          showFiscaliasAlert={this.state.showFiscaliasAlert}
          showCitiesAlert={this.state.showCitiesAlert}
          showCrimesAlert={this.state.showCrimesAlert}
          showRequestsAlert={this.state.showRequestsAlert}
          selectedFiscaliasID={this.state.selectedFiscaliasID}
          callbackSetCitiesById={this.callbackSetCitiesById}
          queryStyle={this.state.queryStyle}/>

        {this.state.showTable || this.state.showPivotTable || this.state.showChart?
        <div className="shadow-box z-depth-5 resultBox">
          
          <div className="resultArea">

            <div>{this.state.showCreate ? this.showModalCreate() : null}</div>
            <div>{this.state.showUpdate ? this.showModalUpdate() : null}</div>
            <div className="buttonGroupTable">
              <ButtonGroup className="buttonGroupShowTable">
                
                {true?<MDBBtn color="amber" onClick={()=>this.handleShowPivotTable()}><MDBIcon far icon="hand-paper" size="2x"/></MDBBtn>:null}
                {true?<MDBBtn color="info" onClick={()=>this.handleShowTable()}><MDBIcon icon="table" size="2x"/></MDBBtn>:null}
                {true?<MDBBtn color="light-green" onClick={()=>this.handleShowChart()}><MDBIcon far icon="chart-bar" size="2x"/></MDBBtn>:null}

              </ButtonGroup >

              {this.state.showTable?
                <ButtonGroup className="buttonGroupDownload">
                  {false?<CSVLink style={{color:'white'}} data={this.state.imputeds} target="_blank" separator={";"}>
                    <Button variant='info' onClick={()=>this.handleProcessBinnacle(3)}><a className="downloadExcelTextBtn">CSV </a><MDBIcon icon="file-csv"  size="2x"/></Button>
                  </CSVLink>:null}
                  <Excel data={this.state.imputeds} callbackProcessBinnacle={this.handleProcessBinnacle} type={2} section={'Imputados'} />
                  {false?<PDF chart={this.state.chart} table={this.state.table} data={this.state.imputeds} callbackProcessBinnacle={this.handleProcessBinnacle} type={3} section={'Imputados'} />:null}
                </ButtonGroup>
              :this.state.showPivotTable?
                <ButtonGroup className="buttonGroupDownload">
                  <Excel table={this.state.table} callbackProcessBinnacle={this.handleProcessBinnacle} type={1} section={'Imputados'} />
                  <PDF table={this.state.table} callbackProcessBinnacle={this.handleProcessBinnacle} type={1} section={'Imputados'} />
                </ButtonGroup>
              :this.state.showChart?
                <ButtonGroup className="buttonGroupDownload">
                  <PDF chart={this.state.chart} table={this.state.table} callbackProcessBinnacle={this.handleProcessBinnacle} type={2} section={'Imputados'} />
                </ButtonGroup>
              :null
              }

              {this.state.showOutdatedTableAlert?
                <div>
                <hr/>
                  <Alert variant="warning">
                    {this.state.showChart? 'Gráfica': 'Tabla'} desactualizada!, Procese nuevamente su consulta.
                  </Alert>
                </div>
              :
                null
              }
              
              
            </div>

            <Table 
              selectedRequests={this.state.selectedRequests} 
              showTable={this.state.showTable} 
              showGener={false}
              showAge={false}
              showProfession={false}
              showNationality={false}
              showRelationship={false}
              showWeapon={false}
              imputeds={this.state.imputeds}/>
            
            {this.renderPivotTable()}

            {false?
              <LineChart
                width={1000}
                height={600}
                data={this.state.imputeds}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Edad" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Sexo" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            :null
            }

          </div>

        </div>
        :null
        }

        <br/>
        <br/>
        
      </div>
    );
  }
}

export default Imputeds;