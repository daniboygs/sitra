import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import PivotTableUI from '../../libs/react-pivottable/PivotTableUI';
//import PivotTableUI from 'react-pivottable/PivotTableUI';
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
        carpets: this.props.carpets,
        showTable: false,
        aggregatorName: "Contar",
        cols: [],
        rendererName: "Tabla",
        rows: [],
        sorters: [],
        tableOptions: [],
        vals: [],
        valueFilter: []
    }

  }

  componentDidMount(){
    console.log('pivot', this.props.pivotTableValues);
    if(this.props.pivotTableValues == undefined){
      this.setState({
        rows: ["Delito"],
        cols: ["Año"],
        showTable: this.props.showTable
      });
      console.log('1');
    }
    else{
      console.log('2');
      this.setState({
        showTable: this.props.showTable,
        cols: this.props.pivotTableValues.cols,
        rows: this.props.pivotTableValues.rows,
        sorters: this.props.pivotTableValues.sorters,
        tableOptions: this.props.pivotTableValues.tableOptions,
        vals: this.props.pivotTableValues.vals,
        valueFilter: this.props.pivotTableValues.valueFilter
      });
    }
    setTimeout(
      function(){
        this.props.handleGetPivotTable();
      }
      .bind(this),
      100
    );
    console.log("estadooooo",this.state);
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
                data={this.props.carpets}
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