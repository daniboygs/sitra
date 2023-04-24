import * as React from 'react';
import "./style/style.css"
//import { Redirect } from 'react-router';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, Tooltip, ButtonToolbar, InputGroup, Alert} from 'react-bootstrap';
import { getCarpets, getFiscalias, getQueryList, setQueryBinnacle, getIP} from '../Service';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { BookModel } from "../../../models/BookModel";
import { MDBIcon, MDBBtn } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import loading from '../loading/loading';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ReactNotification, {store} from 'react-notifications-component';
 
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

import Years from '../catalogs/years';
import Fiscalias from '../catalogs/fiscalias';
import Cities from '../catalogs/cities';
import Crimes from '../catalogs/crimes';
import Requests from '../catalogs/requests';

import PivotTableUI from '../../libs/react-pivottable/PivotTableUI';
//import PivotTableUI from 'react-pivottable/PivotTableUI';
import '../../libs/react-pivottable/pivottable.css';
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

import { CSVLink } from "react-csv";
import PDF from '../export/pdf/pdf';
import Excel from '../export/excel/excel';

import Query from './query';

import { DataSection } from './dataSections/dataSection';

import { TableButtonGroup } from './buttonGroups/tableButtonGroup';

import 'react-notifications/lib/notifications.css';
import 'react-notifications/dist/react-notifications.css';
import { element } from 'prop-types';



import Plotly from 'plotly.js';

const Plot = createPlotlyComponent(Plotly);

//import createPlotlyComponent from 'react-plotly.js';
//const Plot = createPlotlyComponent(window.Plotly);
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

const tableAttr = {
  result: '',
  searchText: '',
  sortName: '',
  sortOrder: ''
}


class Carpets extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
      currentComponent: 'pivotTable',
      filteredData: [],
      tableDataChange: false,
      carpets: [],
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
      showLoadingMessage: false,
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
      showProcessingDataAlert: false,
      processingStatus: false,
      table: "",
      chartValues: "",
      plot: "",

      queryStyle: "queryStart",
      buttonQueryStyle: "buttonQueryStart",

      binnacleID: 0,
      showChart: false,
      pivotTableValues: [],

      allRequestValues: [],
      rendererChartName: '',
      showForm: true

    }
    this.handleShowQuery = this.handleShowQuery.bind(this);

    this.handleSetData = this.handleSetData.bind(this);
    this.depurateData = this.depurateData.bind(this);
    this.handleShowData = this.handleShowData.bind(this);

    this.handleShowTable = this.handleShowTable.bind(this);
    this.handleShowPivotTable = this.handleShowPivotTable.bind(this);
    this.handleShowChart = this.handleShowChart.bind(this);

    this.handleChangePivotTable = this.handleChangePivotTable.bind(this);
    this.handleChangeChart = this.handleChangeChart.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);

    this.handleGetPivotTable = this.handleGetPivotTable.bind(this);
    this.handleGetChart = this.handleGetChart.bind(this);
    this.handleGetTable = this.handleGetTable.bind(this);

    this.handleGetYears = this.handleGetYears.bind(this);
    this.handleGetFiscalias = this.handleGetFiscalias.bind(this);
    this.handleGetCities = this.handleGetCities.bind(this);
    this.handleGetCrimes = this.handleGetCrimes.bind(this);
    this.handleGetRequests = this.handleGetRequests.bind(this);

    this.handleChangeSelectedYears = this.handleChangeSelectedYears.bind(this);
    this.handleChangeSelectedFiscalias = this.handleChangeSelectedFiscalias.bind(this);
    this.handleChangeSelectedCities = this.handleChangeSelectedCities.bind(this);
    this.handleChangeSelectedCrimes = this.handleChangeSelectedCrimes.bind(this);
    this.handleChangeSelectedRequests = this.handleChangeSelectedRequests.bind(this);

    this.handleProcess = this.handleProcess.bind(this);
    this.handleProcessBinnacle = this.handleProcessBinnacle.bind(this);

    this.setBinnacle = this.setBinnacle.bind(this);

    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleShowLoading = this.handleShowLoading.bind(this);
    this.handleShowOutdatedTableAlert = this.handleShowOutdatedTableAlert.bind(this);
    this.handleShowProcessingDataAlert = this.handleShowProcessingDataAlert.bind(this);

    this.handlePvtAttrListener = this.handlePvtAttrListener.bind(this);

    this.getOS = this.getOS.bind(this);

    this.resetPivotTable = this.resetPivotTable.bind(this);
    this.resetView = this.resetView.bind(this);

  }

  handleShowQuery = () => {
    this.setState({
      buttonQueryStyle: "buttonQueryStart",
      queryStyle: "queryShow"
    });
  }

  handleSetData = (response) => {
    this.setState({
      showLoadingMessage: true,
      carpets: this.depurateData(response),
      filteredData: this.state.carpets
    });
  }

  depurateData = (data) => {
    for(var i in data){
      switch(data[i]['Delito']){
        case 'Elaboración, alteración o uso indebido de placas, engomados o documentos de identificación de vehícu':
          data[i]['Delito'] = 'Elaboración, alteración o uso indebido de placas de vehículos';
          break;
        case 'Retención o sustracción especifica de persona menor de edad o que no tenga la capacidad para compren':
          data[i]['Delito'] = 'Retención o sustracción especifica de menor de edad';
          break;
        case 'Retención o sustracción especifica de persona menor de edad o que no tenga la capacidad para comprender el hecho en grado de tentativa':
          data[i]['Delito'] = 'Retención o sustracción especifica de menor de edad en grado de tentativa';
          break;
      }

      data[i] = {
        ...data[i],
        Año: data[i]['Anio']
      }

      delete data[i]['Anio'];
    }

    console.log(data);

    return data;
  }

  handleShowData = () => {   
    switch(this.state.currentComponent){
      case 'pivotTable':
        this.handleShowPivotTable();
        break;
      case 'chartTable':
        this.handleShowChart();
        break;
      case 'table':
        this.handleShowTable();
        break;
    }
  }

  handleShowPivotTable = () => {
    this.setState({
      showTable: false,
      showChart: false
    });

    setTimeout(
      function(){
        this.setState({
          showPivotTable: true
        });
      }
      .bind(this),
      10
    );
  }

  handleShowChart = () => {
    this.setState({
      showTable: false,
      showPivotTable: false,
    })

    setTimeout(
      function(){
        this.setState({
          showChart: true
        });
      }
      .bind(this),
      10
    );
  }

  handleShowTable = () => {
    this.setState({
      showPivotTable: false,
      showChart: false
    });

    setTimeout(
      function(){
        this.setState({
          showTable: true
        });
      }
      .bind(this),
      10
    );
  }

  handleChangePivotTable = (data) => {
    if(data != undefined){
      setTimeout(
        function(){
          this.setState({
            pivotTableValues: data,
            table: document.getElementById('pvtTable'),
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

  handleChangeChart = (data) => {
    if(data != undefined){
      setTimeout(
        function(){
          this.setState({
            pivotTableValues: data,
            rendererChartName: data.rendererName, 
            plot: document.getElementsByClassName('main-svg')[0],
            chartValues: document.getElementsByClassName('main-svg')[1]
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
            plot: document.getElementsByClassName('main-svg')[0],
            chartValues: document.getElementsByClassName('main-svg')[1]
          });
        }
        .bind(this),
        300
      );
    }
  }

  handleChangeTable = (result) => {
    if(JSON.stringify(this.state.filteredData) != JSON.stringify(result)){
      this.setState({
        filteredData: result
      });
    }
  }

  handleGetPivotTable = () => {
    setTimeout(
      function(){
        this.setState({
          table: document.getElementById('pvtTable')
        });
      }
      .bind(this),
      200
    );
  }

  handleGetChart = () => {
    setTimeout(
      function(){
        this.setState({
          plot: document.getElementsByClassName('main-svg')[0],
          chartValues: document.getElementsByClassName('main-svg')[1]
        });
      }
      .bind(this),
      200
    );
  }

  handleGetTable = () => {
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
    })
  }

  handleProcess(e){

    if(this.state.selectedYears.length && this.state.selectedFiscalias.length && this.state.selectedCities.length && this.state.selectedCrimes.length && this.state.selectedRequests.length){

      this.handleShowLoading(true);
      this.resetView();

      let request = [];
      request.push(this.state.selectedYears);
      request.push(this.state.selectedFiscalias);
      request.push(this.state.selectedCities);
      request.push(this.state.selectedCrimes);
      request.push(this.state.selectedRequests);

      console.log(request);
      getCarpets(request).then((response) => {
        console.log(response.data);
        this.handleSetData(response.data);
        this.handleShowData();
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
          title: "¡Campos faltantes!",
          message: "Por favor seleccione todos los campos faltantes para ejecutar su consulta",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          },
          width: 400
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
    var estatus=[], violencia=[], arma=[], mes=[], año=[], fiscalia=[], municipio=[], delito=[];

    for(var k in this.state.carpets) {
      let carpet = this.state.carpets[k];

      if(k==0){
        for(var l in carpet){
          requestFields.push(l);
        }
      }

      if(requestFields.includes("Estatus"))(estatus.push(this.state.carpets[k]["Estatus"]))
      if(requestFields.includes("Cometido con violencia"))(violencia.push(this.state.carpets[k]["Cometido con violencia"]))
      if(requestFields.includes("Tipo de arma"))(arma.push(this.state.carpets[k]["Tipo de arma"]))
      if(requestFields.includes("Mes"))(mes.push(this.state.carpets[k]["Mes"]))
      if(requestFields.includes("Año"))(año.push(this.state.carpets[k]["Año"]))
      if(requestFields.includes("Fiscalia"))(fiscalia.push(this.state.carpets[k]["Fiscalia"]))
      if(requestFields.includes("Municipio"))(municipio.push(this.state.carpets[k]["Municipio"]))
      if(requestFields.includes("Delito"))(delito.push(this.state.carpets[k]["Delito"]))

    }

    var allRequestValues = {
      Estatus: [...new Set(estatus)],
      "Cometido con violencia": [...new Set(violencia)],
      "Tipo de arma": [...new Set(arma)],
      Mes: [...new Set(mes)],
      Año: [...new Set(año)],
      Fiscalía: [...new Set(fiscalia)],
      Municipio: [...new Set(municipio)],
      Delito: [...new Set(delito)]
    },
    realValueFilters = {
      Estatus: [],
      "Cometido con violencia": [],
      "Tipo de arma": [],
      Mes: [],
      Año: [],
      Fiscalía: [],
      Municipio: [],
      Delito: []
    },
    notValueFilters = {
      Estatus: [],
      "Cometido con violencia": [],
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

    const request = {
      query: allRequestValues,
      device: this.getOS(),
      attributes: filteredAttributes,
      binnacle: this.state.binnacleID,
      type: 0, //0 - Search, 1 - Download
      section: 2, //1 - Folders, 2 - carpets, 3 - Imputeds
      geoplugin: geoplugin
    }

    switch(type){
      case 1: //Search

        request.binnacleID = 0;
        request.type = 0;

        /*setQueryBinnacle(request.query, request.device, request.attributes, request.binnacle, request.type, request.section, request.geoplugin).then((response) => {
          this.setState({
            binnacleID: response.data
          });
          console.log(response.data);
        }).catch(
          (error)=>{
            console.log(error);
          }
        );*/
        break;
      case 2: //Download all values
        request.type = 1;

        //setQueryBinnacle(request.query, request.device, request.attributes, request.binnacle, request.type, request.section, request.geoplugin);
        break;
      case 3: //Download with filtered values
        request.type = 1;

        if(this.state.pivotTableValues.valueFilter){

          for(var m in this.state.pivotTableValues.valueFilter){
            for(var n in this.state.pivotTableValues.valueFilter[m]){
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

          request.query = realValueFilters;

          //setQueryBinnacle(request.query, request.device, request.attributes, request.binnacle, request.type, request.section, request.geoplugin);
        }

        break;
    }
  
  }

  handleShowForm = (value) => {
    this.setState({
      showForm: value
    });
  }

  handleShowLoading = (value) => {
    this.setState({
      showLoading: value
    });
  }

  handleShowOutdatedTableAlert = (value) => {
    this.setState({
      showOutdatedTableAlert: value
    });
  }

  handleShowProcessingDataAlert = (event) => {
    event.preventDefault();
    if ((event.target.className == "pvtAxisContainer pvtVertList pvtRows" || event.target.className == "pvtAxisContainer pvtHorizList pvtCols") && this.state.carpets.length>20000){
      alert('Procesando datos!, Espere mientras se está procesando la información de los datos.');
    }
  }

  handlePvtAttrListener(value){
    if(value){
      console.log('adding listener...');
      document.addEventListener('drop', this.handleShowProcessingDataAlert);
    }
    else{
      console.log('removing listener...');
      document.removeEventListener('drop', this.handleShowProcessingDataAlert)
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

  resetPivotTable(){
    this.setState({
      aggregatorName: "Contar",
      cols: ['Año'],
      data: this.state.carpets,
      rendererName: "Tabla",
      rows: ['Delito'],
      sorters: {},
      tableOptions: {},
      vals: [],
      valueFilter: {}
    });
  }

  resetView(){
    this.resetPivotTable();
    this.handleShowOutdatedTableAlert(false);

    this.setState({
      showTable: false,
      showPivotTable: false,
      showChart: false,
    });

  }

  /*<MDBIcon icon="envelope" className="customClass" ></MDBIcon>*/

  /* Alert

  {this.state.showRequestsAlert?
        <Alert variant="danger">
          <strong>Campo Vacío!</strong> Seleccione alguna opción
        </Alert>: null}

  */
  
  render() {
      
    return (
      	<div>

			{
			!(this.state.years.length && 
			this.state.fiscalias.length &&
			this.state.crimes.length && 
			this.state.requests.length) || this.state.showLoading
			?
			<>
			
			<Loading/>
			</>
			:null
			}

			<ReactNotification />

			<Button id={this.state.buttonQueryStyle} variant='success' onClick={()=>this.handleShowQuery()}>Nueva Consulta</Button>

			{
			!this.state.showForm?
				<>
					<OverlayTrigger
						placement={'top'}
						overlay={
						<Tooltip>
							<strong>Nueva Consulta</strong>.
						</Tooltip>
						}
					>
					<a 
					className='attachedShowQueryBtn' 
					style={{top: '200px', left: '-25px', position: 'fixed', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', color: 'white', width: '80px'}} 
					onClick={()=>{this.handleShowForm(true); window.scrollTo(0, 0);}}>
					<MDBIcon icon="window-maximize" size="2x"/>
					</a>
				</OverlayTrigger>{' '}
			</>
			:
			null
			}

			<Query
				headerTitle = {"DENUNCIAS"}
				requestType = {"carpet"}
				showQuery = {this.state.carpets.length? true: false}
				handleShowForm = {this.handleShowForm}
				showForm = {this.state.showForm}
				handleChangeSelectedRequests = {this.handleChangeSelectedRequests} 
				handleChangeSelectedYears = {this.handleChangeSelectedYears}
				handleChangeSelectedFiscalias = {this.handleChangeSelectedFiscalias}
				handleChangeSelectedCities = {this.handleChangeSelectedCities}
				handleChangeSelectedCrimes = {this.handleChangeSelectedCrimes}
				handleGetRequests = {this.handleGetRequests}
				handleGetYears = {this.handleGetYears}
				handleGetFiscalias = {this.handleGetFiscalias}
				handleGetCities = {this.handleGetCities}
				handleGetCrimes = {this.handleGetCrimes}
				handleProcess = {this.handleProcess}
				showYearsAlert = {this.state.showYearsAlert}
				showFiscaliasAlert = {this.state.showFiscaliasAlert}
				showCitiesAlert = {this.state.showCitiesAlert}
				showCrimesAlert = {this.state.showCrimesAlert}
				showRequestsAlert = {this.state.showRequestsAlert}
				selectedFiscaliasID = {this.state.selectedFiscaliasID}
				callbackSetCitiesById = {this.callbackSetCitiesById}
				queryStyle = {this.state.queryStyle}
			/>

			{
			this.state.showTable || this.state.showPivotTable || this.state.showChart?

				<div className="shadow-box z-depth-5 resultBox" style={this.state.showForm?{width: '80%'}:{width: '100%'}}>

				<div style={{padding: '25px'}}>
					{/*<div className="resultArea"> */}
					

					<TableButtonGroup
						section = {'Denuncias'}
						data = {this.state.carpets}
						filteredData = {this.state.filteredData}
						chartValues = {this.state.chartValues}
						table = {this.state.table}
						plot = {this.state.plot}
						handleShowPivotTable = {this.handleShowPivotTable} 
						handleShowTable = {this.handleShowTable} 
						handleShowChart = {this.handleShowChart}
						showPivotTable = {this.state.showPivotTable} 
						showTable = {this.state.showTable} 
						showChart = {this.state.showChart}
						handleProcessBinnacle = {this.handleProcessBinnacle}
						showOutdatedTableAlert = {this.state.showOutdatedTableAlert}
						showProcessingDataAlert = {this.state.showProcessingDataAlert}
					/>

					<DataSection
						data = {this.state.carpets} 
						showForm = {this.state.showForm}
						showPivotTable = {this.state.showPivotTable}
						showTable = {this.state.showTable}  
						pivotTableValues = {this.state.pivotTableValues} 
						handleGetPivotTable = {this.handleChangePivotTable} 
						handleGetChart = {this.handleGetChart}
						handlePvtAttrListener = {this.handlePvtAttrListener}
						showPivotTable = {this.state.showPivotTable} 
						showTable = {this.state.showTable} 
						showChart = {this.state.showChart} 
						rendererChartName = {this.state.rendererChartName} 
						selectedRequests = {this.state.selectedRequests} 
						handleChangePivotTable = {this.handleChangePivotTable} 
						handleChangeTable = {this.handleChangeTable} 
						handleChangeChart = {this.handleChangeChart} 
					/>

				</div>

				</div>

			:this.state.showLoadingMessage?

				<div className="shadow-box z-depth-5 resultBox" style={this.state.showForm?{width: '80%'}:{width: '100%', height: '100%', marginBottom: '40px'}}>
					<h1 style={{width: '70%', height: '50px', textAlign: 'center', fontFamily: 'LabradorA', color: '#152F4A', margin: '0 auto', padding: '14px', marginTop: '200px', marginBottom: '200px'}}>Cargando...</h1>
				</div>

			:null
			}

			<br/>
			<br/>
        
      	</div>
    );
  }
}

export default Carpets;