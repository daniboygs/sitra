import * as React from 'react';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';

import { getYears } from '../Service'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';


class Years extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        yearsOptions: [],
        years: [],
        selectedYears: []
    }

    this.fillYears = this.fillYears.bind(this);
    this.setYearsOptions = this.setYearsOptions.bind(this);

    this.selectMultipleOptions = this.selectMultipleOptions.bind(this);

  }

  componentDidMount(){
    this.fillYears();
  }

  fillYears = () => {
    getYears().then(response=>{
      this.setState({
        years: response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    this.setYearsOptions();
  }

  setYearsOptions=()=>{
    if(this.state.years.length>0){
      console.log(this.state.years);
      setTimeout(
          function() {

            let options = [];
            let years = this.state.years;

            years.forEach(myFunction);
            
            function myFunction(years) {
              options.push(years.anio);
            }
            this.setState({
              yearsOptions: [...new Set(options)]
            })
            this.props.callbackYears([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setYearsOptions();
        }
        .bind(this),
        300
      )
    }
  }

  selectMultipleOptions(value) {
    console.log("Val", value);
    this.setState({ 
      selectedYears: value 
    });
    this.props.callbackSelectedYears(value);
  }
  
  render() {
    return (
        <Picky
          placeholder="Seleccione año(s)"
          value={this.state.selectedYears}
          options={this.state.yearsOptions}
          onChange={this.selectMultipleOptions}
          open={false}
          valueKey="id"
          labelKey="name"
          multiple={true}
          numberDisplayed={1}
          includeSelectAll={true}
          includeFilter={true}
          dropdownHeight={400}
          selectAllText='Seleccionar Todo'
        />
    );
  }
}

export default Years;