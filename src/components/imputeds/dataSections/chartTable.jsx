import * as React from 'react';

//import PivotTableUI from 'react-pivottable/PivotTableUI';
import PivotTableUI from '../../../libs/react-pivottable/PivotTableUI';
import createPlotlyRenderers from '../../../libs/react-pivottable/PlotlyRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js';

const Plot = createPlotlyComponent(Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);

class ChartTable extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        data: this.props.data,
        show: this.props.show,
        aggregatorName: "Contar",
        cols: this.props.pivotTableValues.cols,
        rows: this.props.pivotTableValues.rows,
        sorters: this.props.pivotTableValues.sorters,
        tableOptions: this.props.pivotTableValues.tableOptions,
        vals: this.props.pivotTableValues.vals,
        valueFilter: this.props.pivotTableValues.valueFilter,
        rendererName: this.props.rendererChartName
    }

  }

  componentDidMount(){
    if(this.props.pivotTableValues.rows == undefined && this.props.pivotTableValues.cols == undefined){
      this.setState({
        rows: ["Delito"],
        cols: ["Año"]
      });
    }
    else{
      this.setState({
        rendererName: this.props.rendererChartName
      });
    }
    if(this.props.rendererChartName==""){
      this.setState({
        rendererName: 'Gráfica de columnas agrupadas'
      });
    }
    setTimeout(
      function(){
        this.props.handleGetChart();
        this.props.handlePvtAttrListener(true);
      }
      .bind(this),
      200
    );
    console.log(this.state.sorters);
    document.getElementsByClassName("pvtDropdownValue")[1].style.display = "none";
    document.getElementsByClassName("pvtRowOrder")[0].style.display = "none";
    document.getElementsByClassName("pvtColOrder")[0].style.display = "none";
  }

  componentWillUnmount(){
    this.props.handlePvtAttrListener(false);
  }

  render() {
    return (
        <div style={{
            overflowX: 'scroll',
            overflowY: 'scroll',
            width : '700', height : '400'}} >
          <div hidden={!this.state.show}>           
            <PivotTableUI
                data={this.props.data}
                hiddenAttributes={['#']}
                onChange={s => {this.setState(s); this.props.handleChangeChart(s)}}
                renderers={Object.assign({}, PlotlyRenderers)}
                {...this.state}
            />
          </div>
        </div>
    );
  }
}

export default ChartTable;