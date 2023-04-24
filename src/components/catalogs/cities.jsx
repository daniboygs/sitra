import * as React from 'react';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';

import { getCities } from '../Service'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';


class Cities extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        cityOptions: [],
        cities: [],
        selectedCities: []
    }

    this.fillCities = this.fillCities.bind(this);
    this.setCitiesOptions = this.setCitiesOptions.bind(this);

    this.selectMultipleOptions = this.selectMultipleOptions.bind(this);

  }

  componentDidMount(){
    this.props.callbackSetCitiesById(this.setCitiesById.bind(this))
    this.fillCities();
  }

  fillCities = () => {
    getCities().then(response=>{
      this.setState({
        cities: response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    //this.setCitiesOptions();
  }

  setCitiesOptions=()=>{
    if(this.state.cities.length>0){
      console.log(this.state.cities);
      setTimeout(
          function() {

            let options = [];
            let cities = this.state.cities;

            cities.forEach(myFunction);
            
            function myFunction(city) {
              options.push(city.Nombre);
            }
            this.setState({
              cityOptions: [...new Set(options)]
            })
            this.props.callbackCities([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setCitiesOptions();
        }
        .bind(this),
        300
      )
    }
  }

  setCitiesById(selectedFiscaliasID){
    if(this.state.cities.length>0){
      setTimeout(
          function() {

            let options = [];
            let cities = this.state.cities;

            cities.forEach(myFunction);

            function myFunction(city) {

              if(selectedFiscaliasID.includes(city.CatFiscaliasID)){
                options.push(city.Nombre);
              }
              
            }
            this.setState({
              cityOptions: [...new Set(options)]
            })

            this.props.callbackCities([...new Set(options)]);
            console.log([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setCitiesById(selectedFiscaliasID);
        }
        .bind(this),
        300
      )
    }
  }

  selectMultipleOptions(value) {
    console.log("Val", value);
    this.setState({ 
      selectedCities: value 
    });
    this.props.callbackSelectedCities(value);
  }
  
  render() {
    return (
        <Picky
          placeholder="Seleccione municipio(s)"
          value={this.state.selectedCities}
          options={this.state.cityOptions}
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

export default Cities;