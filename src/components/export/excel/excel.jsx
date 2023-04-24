import * as React from 'react';
import {Button, Popover, Title, Content, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {getHeader} from './header';
import {MDBIcon} from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../assets/styles.css'

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Alerta</Popover.Title>
    <Popover.Content>
      Estas tratando de descargar una gran cantidad de datos, 
      te sugerimos utilizar el navegador Firefox para esta descarga
    </Popover.Content>
  </Popover>
);

class Excel extends React.Component{
  constructor(props)
  {
    super(props);
    this.handleExcel = this.handleExcel.bind(this);
    this.handleModifyTable = this.handleModifyTable.bind(this);
    this.handleModifyPivotTable = this.handleModifyPivotTable.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.getNavigator = this.getNavigator.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleModifyTable = (section) => {

    var columns = [];
    var htmlHeaders = '';
    var htmlContent = '';
    var htmlTable = "";

    for(var i in this.props.data[0]){
        var sub_key = i;
        var sub_val = this.props.data[0][i];
        columns.push(sub_key);   
    }

    for(var i=0; i<columns.length; i++){
        htmlHeaders+='<th>'+columns[i]+'</th>';
    }
    
    for(var row in this.props.data){
        htmlContent+='<tr>';
        for(var i in this.props.data[row]){
            htmlContent+='<td>'+this.props.data[row][i]+'</td>';  
        }
        htmlContent+='</tr>';
    }

    htmlTable='<table>'+getHeader(section)+'<tr>'+htmlHeaders+'</tr>'+htmlContent+'</table>';

    return htmlTable;
  }

  handleModifyPivotTable = (section) => {
    let array = String(this.props.table.outerHTML.replace(/\,/g,'')).split(" ");
    let newTable="";
    let i=0;
  
    for(i = 0; i<array.length; i++){
  
      if(array[i]=='id="pvtTable"><thead><tr><th'){
        newTable+='id="pvtTable"><thead><tr>'+getHeader(section)+'<th ';
      }
      else{
        newTable+=array[i]+' ';
      }
    }
    return newTable;
  }

  handleDownload = (table, section) => {
    let sheet = section;
    let filename = ''+(new Date())+'.xls';

    var uri = 'data:application/vnd.ms-excel;base64,';

    console.log(table);

    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' + 'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' + 'xml><![endif]--></head><body>{table}</body></html>';

    var context = {
        worksheet: sheet || 'Worksheet',
        table: table
    };

    // If IE11

    console.log('msSave', window.navigator.msSaveOrOpenBlob);
    if (window.navigator.msSaveOrOpenBlob) {
        var fileData = ['' + ('<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' + 'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' + 'xml><![endif]--></head><body>') + table + '</body></html>'];
        var blobObject = new Blob(fileData);
        document.getElementById('react-html-table-to-excel').click()(function () {
        window.navigator.msSaveOrOpenBlob(blobObject, filename);
        });

        return true;
    }

    var element = window.document.createElement('a');
    element.href = uri + ReactHTMLTableToExcel.base64(ReactHTMLTableToExcel.format(template, context));
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);


    return true;
  }

  getNavigator(){
    var agente = window.navigator.userAgent;
      var navegadores = ["Chrome", "Firefox", "Safari", "Opera", "Trident", "MSIE", "Edge"];
      for(var i in navegadores){
          if(agente.indexOf( navegadores[i]) != -1 ){
            console.log(navegadores[i]);
              return navegadores[i];
          }
      }
  }

  handleExcel = (type, section) => {
    switch(type){
        case 1:
            this.handleDownload(this.handleModifyPivotTable(section), section);
            this.props.callbackProcessBinnacle(3);
            break;
        case 2:
            this.handleDownload(this.handleModifyTable(section), section);
            this.props.callbackProcessBinnacle(2);
            break;
    }
  }

  renderButton(type){
    switch(type){
      case 1:
        return(
          <>
            {
              this.props.tooltip?

              <>
                  <OverlayTrigger
                      placement={'top'}
                      overlay={
                      <Tooltip>
                          <strong>Descargar Excel</strong>.
                      </Tooltip>
                      }
                  >
                      <button id="excelBtn" style={{color: '#FFFFFF', backgroundColor: '#31A967'}} onClick={()=>this.handleExcel(this.props.type, this.props.section)}><a className="downloadPDFTextBtn">Descargar excel </a><MDBIcon far icon="file-excel" size="2x"/></button>
                  </OverlayTrigger>{' '}
              </>
            :
            <button id="excelBtn" style={{color: '#FFFFFF', backgroundColor: '#31A967'}} onClick={()=>this.handleExcel(this.props.type, this.props.section)}><a className="downloadPDFTextBtn">Descargar excel </a><MDBIcon far icon="file-excel" size="2x"/></button>
            }
          </>
        );
          break;
      case 2:
        return(
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <button id="excelBtn" style={{color: '#FFFFFF', backgroundColor: '#E8CE4C'}}><a className="downloadPDFTextBtn">Descargar excel </a><MDBIcon far icon="file-excel" size="2x"/></button>
          </OverlayTrigger>
        );
          break;
    }
  }

  render() {
    if(this.props.data!=undefined){
      if(this.getNavigator() == 'Chrome' && this.props.data.length > 6000){
        return (
          this.renderButton(2)
        );      
      }
      else{
        return (
          this.renderButton(1)
        );
      }
    }
    else{
      return (
        this.renderButton(1)
      );
    }
  }
}

export default Excel;