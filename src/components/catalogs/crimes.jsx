import * as React from 'react';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';

import { getCrimes } from '../Service'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';


class Crimes extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        crimeOptions: [],
        crimes: [],
        selectedCrimes: []
    }

    this.fillCrimes = this.fillCrimes.bind(this);
    this.setCrimesOptions = this.setCrimesOptions.bind(this);

    this.selectMultipleOptions = this.selectMultipleOptions.bind(this);

  }

  componentDidMount(){
    this.fillCrimes();
  }

  fillCrimes = () => {
    getCrimes().then(response=>{
      this.setState({
        crimes: response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    this.setCrimesOptions();
  }

  setCrimesOptions=()=>{
    if(this.state.crimes.length>0){
      console.log(this.state.crimes);
      setTimeout(
          function() {

            let options = [];
            let crimes = this.state.crimes;

            crimes.forEach(myFunction);
            
            function myFunction(crime) {
              options.push(crime.Grupo);
            }
            this.setState({
              crimeOptions: [...new Set(options)]
            })
            this.props.callbackCrimes([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setCrimesOptions();
        }
        .bind(this),
        300
      )
    }
  }

  selectMultipleOptions(value) {
    console.log("Val", value);
    this.setState({ 
      selectedCrimes: value 
    });
    this.props.callbackSelectedCrimes(value);
  }
  
  render() {
    return (
        <Picky
          placeholder="Seleccione delito(s)"
          value={this.state.selectedCrimes}
          options={this.state.crimeOptions}
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

export default Crimes;