import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Chart} from 'react-google-charts';

class Charts extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        years: this.props.years,
        fiscalias: this.props.fiscalias,
        crimes: this.props.crimes,
        selectedRequests: this.props.selectedRequests, 
        victims: this.props.victims,
        showTable: false
    }

    this.countRequests = this.countRequests.bind(this);

  }

  componentDidMount(){
      console.log(this.props.victims);
      console.log(this.props.selectedRequests);
  }

  countRequests(){

  }

  render() {
    return (
        <Chart
            width={'100%'}
            height={'600px'}
            chartType="ComboChart"
            loader={<div>Loading Chart</div>}
            data={[
                [
                'Month',
                'Bolivia'
                ],
                ['2004/05', 165],
                ['2005/06', 135],
                ['2006/07', 157],
                ['2007/08', 139],
                ['2008/09', 136],
            ]}
            options={{
                title: 'Monthly Coffee Production by Country',
                vAxis: { title: 'Cups' },
                hAxis: { title: 'Month' },
                seriesType: 'bars',
                series: { 1: { type: 'line' } },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
  }
}

export default Charts;