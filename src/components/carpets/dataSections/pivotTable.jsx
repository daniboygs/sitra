import * as React from 'react';

//import PivotTableUI from '../../libs/react-pivottable/PivotTableUI';
import PivotTableUI from '../../../libs/react-pivottable/PivotTableUI';
//import PivotTableUI from 'react-pivottable/PivotTableUI';
import TableRenderers from '../../../libs/react-pivottable/TableRenderers';

class PivotTable extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        data: this.props.data,
        show: this.props.show,
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
        cols: ["Año"]
      });
    }
    setTimeout(
      function(){
        this.props.handleGetPivotTable();
        this.props.handlePvtAttrListener(true);
      }
      .bind(this),
      100
    );
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
            width : '700', height : '200'}} >
          <div hidden={!this.state.show}>
            <PivotTableUI
                data={this.props.data}
                hiddenAttributes={['#']}
                onChange={s => {this.setState(s); this.props.handleChangePivotTable(s)}}
                renderers={Object.assign({}, TableRenderers)}
                {...this.state}
            />
          </div>
        </div>
    );
  }
}

export default PivotTable;