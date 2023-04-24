import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//import PivotTableUI from 'react-pivottable/PivotTableUI';
import PivotTableUI from '../../libs/react-pivottable/PivotTableUI';
import TableRenderers from '../../../libs/react-pivottable/TableRenderers';
import createPlotlyRenderers from '../../../libs/react-pivottable/PlotlyRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js';

const Plot = createPlotlyComponent(Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);

class PivotTable extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        imputeds: this.props.imputeds,
        showTable: false,
        aggregatorName: "Contar",
        cols: this.props.pivotTableValues.cols,
        rendererName: "Tabla",
        rows: this.props.pivotTableValues.rows,
        sorters: this.props.pivotTableValues.sorters,
        tableOptions: this.props.pivotTableValues.tableOptions,
        vals: this.props.pivotTableValues.vals,
        valueFilter: this.props.pivotTableValues.valueFilter
    }

  }

  componentDidMount(){
    if(this.props.pivotTableValues.rows == undefined && this.props.pivotTableValues.cols == undefined){
      this.setState({
        rows: ["Delito"],
        cols: ["Año"],
        showTable: this.props.showTable
      });
    }
    else{
      this.setState({
        showTable: this.props.showTable
      });
    }
    setTimeout(
      function(){
        this.props.handleGetPivotTable();
      }
      .bind(this),
      100
    );
    document.getElementsByClassName("pvtDropdownValue")[1].style.display = "none";
    document.getElementsByClassName("pvtRowOrder")[0].style.display = "none";
    document.getElementsByClassName("pvtColOrder")[0].style.display = "none";
  }

  
  render() {
    return (
        <div style={{
            overflowX: 'scroll',
            overflowY: 'scroll',
            width : '700', height : '200'}} >

            <PivotTableUI
                data={this.props.imputeds}
                hiddenAttributes={['#']}
                onChange={s => {this.setState(s); this.props.handleChangePivotTable(s)}}
                renderers={Object.assign({}, TableRenderers)}
                {...this.state}
            />
        </div>
    );
  }
}

export default PivotTable;