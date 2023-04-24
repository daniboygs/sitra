import * as React from 'react';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';

import { getStatus } from '../Service'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';


class Status extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        statusOptions: [],
        status: [],
        selectedStatus: []
    }

    this.fillStatus = this.fillStatus.bind(this);
    this.setStatusOptions = this.setStatusOptions.bind(this);

    this.selectMultipleOptions = this.selectMultipleOptions.bind(this);

  }

  componentDidMount(){
    this.fillStatus();
  }

  fillStatus = () => {
    getStatus().then(response=>{
      this.setState({
        status: response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    this.setStatusOptions();
  }

  setStatusOptions=()=>{
    if(this.state.status.length>0){
      console.log(this.state.status);
      setTimeout(
          function() {

            let options = [];
            let status = this.state.status;

            status.forEach(myFunction);
            
            function myFunction(status) {
              options.push(status.Nombre);
            }
            this.setState({
              statusOptions: [...new Set(options)]
            })
            this.props.callbackStatus([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setStatusOptions();
        }
        .bind(this),
        300
      )
    }
  }

  selectMultipleOptions(value) {
    console.log("Val", value);
    this.setState({ 
      selectedStatus: value 
    });
    this.props.callbackSelectedStatus(value);
  }
  
  render() {
    return (
        <Picky
          placeholder="Seleccione Estatus de Carpetas..."
          value={this.state.selectedStatus}
          options={this.state.statusOptions}
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

export default Status;