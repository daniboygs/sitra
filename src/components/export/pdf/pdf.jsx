import * as React from 'react';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import {getTemplate} from './template';
import {MDBIcon} from 'mdbreact';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

class PDF extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        table: this.props.table,
        chartValues: this.props.chartValues,
        plot: this.props.plot
    }
    this.handlePDF = this.handlePDF.bind(this);
    this.handleModifyChart = this.handleModifyChart.bind(this);
    this.getGtitleChart = this.getGtitleChart.bind(this);
    this.getValuesLength = this.getValuesLength.bind(this);
  }

  handleModifyChart = () => {
    let plot = document.getElementsByClassName('main-svg')[0].outerHTML;
    let values = document.getElementsByClassName('main-svg')[1].outerHTML;

    let element = String(plot).split(" ");
    let newChart="";
    let i=0;

    for(i = 0; i<element.length; i++){

      if(element[i]=='style="background:'){
        newChart+='style="margin: 0; background: ';
      }
      else{
        newChart+=element[i]+' ';
      }
    }
    newChart+='<br></div>'
    element = String(values).split(" ");

    for(i = 0; i<element.length; i++){

      if(element[i]=='class="gtitle"'){
        newChart+=element[i]+' x="80"';
        i++;
      }
      else if(element[i]=='pointer-events="all"'){
        newChart+=element[i]+' transform="translate(10, 100)"';
        i+=2;
      }
      else if(element[i]=='class="scrollbar"'){
        element[i+8]='rgb(255,';
        element[i+9]='255,';
        element[i+10]='255);';
      }
      else{
        newChart+=element[i]+' ';
      }
    }
    return newChart; 
  }


  getGtitleChart = () => {
    let values = document.getElementsByClassName('main-svg')[1].outerHTML;

    let element = String(values).split(" ");
    let gtitle = '';
    let gtitleElement = '';
    let gtitleArray = '';

    for(let i = 0; i<element.length; i++){
      if(element[i]=='class="gtitle"'){

        while(element[i]!='white-space:'){
          i++;
        }

        while(element[i]!='class="g-xtitle"></g><g'){
          gtitleElement+=element[i]+' ';
          i++;
        }
        
      }
    }

    gtitleArray = String(gtitleElement).split('>');
    gtitle = String(gtitleArray[1]).split('<');
    return gtitle[0]; 
  }

  getValuesLength = (values) => {

    let element = String(values).split(" ");

    let count = 0;

    for(let i = 0; i<element.length; i++){
      if(element[i]=='class="legendtext'){
        count++;
      }
    }
    return count*20.6;
  }

  handlePDF = (type, section) => {
    //var hola = document.getElementsByClassName('pvtTable')[0].outerHTML;
    //ReactPDF.render(<MyDocument />, 'example.pdf');

    //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    //FileSaver.saveAs(blob, "hello world.txt");

    /*html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");  
      });
    ;*/

    /*var pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFontSize(9);
    pdf.setFont("times");
    pdf.setTextColor(255, 0, 0);
    pdf.fromHTML(this.state.table);
    pdf.text(10,10, 'This is a 20pt Times Bold red string');
    pdf.save('test.pdf');*/

    /*var day = new Date()
    var dayWrapper = moment(day); 
    var dayString = dayWrapper.format("YYYY MMM D H:mm:ss"); */
    
    switch(type){
      case 1: //Pivot Table

        var opt = {
          margin:       [10, 10, 10, 10],
          filename:     ''+(new Date())+'.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'mm', format: 'letter', orientation: 'landscape' }
        };

        html2pdf().from(getTemplate(this.props.table, 1)).set(opt).toPdf().get('pdf').then(function (pdf) {

          var txt = 'Datos proporcionados por la Dirección de Planeación y Estadística adscrita a la Dirección General de Tecnologías de la Información, Planeación y Estadística.';
          var totalPages = pdf.internal.getNumberOfPages();
          var i = 0;
          
          pdf.setPage(1);
          pdf.setFontSize(16);
          pdf.setFontType("bold");
          pdf.text('FISCALÍA GENERAL DEL ESTADO DE MICHOACÁN', 70, 20);
          pdf.setFontType("normal");
          pdf.text('Consulta Interactiva de la Incidencia delictiva', 85, 25);
          {section!='Carpetas de investigación'?pdf.text(section, 130, 30):pdf.text(section, 110, 30)}
          
          pdf.setFontSize(8);
          for (i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.text(txt, 10, 210);
            pdf.text(i.toString(), 270, 210);
          }
         }).save();

        this.props.callbackProcessBinnacle(3);
        
        break;

        case 2: //Chart

        var opt = {
          margin:       [0, 0, 0, 10],
          filename:     ''+(new Date())+'.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'mm', format: 'letter', orientation: 'landscape' }
        };

        html2pdf().from(getTemplate(this.handleModifyChart(), 2)).set(opt).toPdf().get('pdf').then(function (pdf) {

          var txt = 'Datos proporcionados por la Dirección de Planeación y Estadística adscrita a la Dirección General de Tecnologías de la Información, Planeación y Estadística.';
          var totalPages = pdf.internal.getNumberOfPages();
          var i = 0;
          
          pdf.setPage(1);
          pdf.setFontSize(16);
          pdf.setFontType("bold");
          pdf.text('FISCALÍA GENERAL DEL ESTADO DE MICHOACÁN', 70, 20);
          pdf.setFontType("normal");
          pdf.text('Consulta Interactiva de la Incidencia delictiva', 85, 25);
          {section!='Carpetas de investigación'?pdf.text(section, 130, 30):pdf.text(section, 110, 30)}
          pdf.setFontSize(8);
          for (i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.text(txt, 10, 210);
            pdf.text(i.toString(), 270, 210);
          }
         }).save();

        break;
  
          break;

        case 3: //Table

          var columns = [];

          for(var i in this.props.data[0]){
              var sub_key = i;
              var sub_val = this.props.data[0][i];
              columns.push({title: sub_key, dataKey: sub_key});
          }

          /*var doc = new jsPDF();
          var totalPagesExp = doc.internal.getNumberOfPages();

          var pageContent = function (data) {
              // HEADER
              doc.setFontSize(20);
              doc.setTextColor(40);
              doc.setFontStyle('normal');
              if (base64Img) {
                  doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
              }
              doc.text("Report", data.settings.margin.left + 15, 22);

              // FOOTER
              var str = "Page " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof doc.putTotalPages === 'function') {
                  str = str + " of " + totalPagesExp;
              }
              doc.setFontSize(10);
              doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
          };

          doc.autoTable(getColumns(), getData(40), {
              addPageContent: pageContent,
              margin: {top: 30}
          });*/




          var pdf = new jsPDF('l', 'mm');
          //var res = doc.autoTableHtmlToJson(this.props.table);
          pdf.autoTable(columns, this.props.data);
          pdf.save("table.pdf");
  
          this.props.callbackProcessBinnacle(2);
  
          break;

        case 4:
          var pdf = new jsPDF('p', 'pt');
          var res = pdf.autoTableHtmlToJson(this.props.table);
          pdf.autoTable(res.columns, res.data);
          pdf.save("table.pdf");

          this.props.callbackProcessBinnacle(2);

          break;
    }
  }

  render() {
    return (
      <>
        {
          this.props.tooltip?

          <>
              <OverlayTrigger
                  placement={'top'}
                  overlay={
                  <Tooltip>
                      <strong>Descargar PDF</strong>.
                  </Tooltip>
                  }
              >
                  <button id="pdfBtn" style={{color: '#FFFFFF', backgroundColor: '#E75050'}} onClick={()=>this.handlePDF(this.props.type, this.props.section)}><a className="downloadPDFTextBtn">Descargar pdf </a><MDBIcon far icon="file-pdf" size="2x" /></button>
              </OverlayTrigger>{' '}
          </>
        :
          <button id="pdfBtn" style={{color: '#FFFFFF', backgroundColor: '#E75050'}} onClick={()=>this.handlePDF(this.props.type, this.props.section)}><a className="downloadPDFTextBtn">Descargar pdf </a><MDBIcon far icon="file-pdf" size="2x" /></button>
        }
      </>
    );
  }
}

export default PDF;