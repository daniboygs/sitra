import * as React from 'react';
import {Container, Col, Button, ButtonGroup, Row, Navbar, Nav, Form, FormControl, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';

import { getFiscalias } from '../Service'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';


class Fiscalias extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        fiscaliaOptions: [],
        fiscalias: [],
        selectedFiscalias: [],
        selectedFiscaliasID: []
    }

    this.fillFiscalias = this.fillFiscalias.bind(this);
    this.setFiscaliasOptions = this.setFiscaliasOptions.bind(this);

    this.selectMultipleOptions = this.selectMultipleOptions.bind(this);

    this.setIdsOptions = this.setIDOptions.bind(this);

  }

  componentDidMount(){
    this.fillFiscalias();
  }

  fillFiscalias = () => {
    getFiscalias().then(response=>{
      this.setState({
        fiscalias: response.data
      });
    }).catch(error=>{
      console.log(error);
    });
    this.setFiscaliasOptions();
  }

  setFiscaliasOptions=()=>{
    if(this.state.fiscalias.length>0){
      console.log(this.state.fiscalias);
      setTimeout(
          function() {

            let options = [];
            let fiscalias = this.state.fiscalias;

            fiscalias.forEach(myFunction);
            
            function myFunction(fiscalia) {
              options.push(fiscalia.Nombre);
            }
            this.setState({
              fiscaliaOptions: [...new Set(options)]
            })
            this.props.callbackFiscalias([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setFiscaliasOptions();
        }
        .bind(this),
        300
      )
    }
  }

  setIDOptions (selectedFiscalias) {
    let options = [];
    selectedFiscalias.forEach(selected => {
      this.state.fiscalias.forEach(fiscalia => {
        if(selected == fiscalia.Nombre){
          options.push(fiscalia.CatFiscaliasID);
        }
      });
    });

    this.setState({
      selectedFiscaliasID: options
    })
    
  }



  selectMultipleOptions(value) {
    console.log("Val", value);
    this.setState({ 
      selectedFiscalias: value 
    });
    this.setIDOptions(value);
    setTimeout(
      function(){
        this.props.callbackSelectedFiscalias(value, this.state.selectedFiscaliasID);
      }
      .bind(this),
      100
    )
  }

  /*showModalCreate(){
    try{
        return (<CreateBook fillTable={this.fillTable} close={this.handleClose} showCreate={this.state.showCreate} categories={this.state.categories}/>);  
    }catch(error){
        console.log(error);
    }
    return <div>Not available</div>
  }

  showModalUpdate(){
    try{  
      return (<UpdateBook fillTable={this.fillTable} close={this.handleClose} showUpdate={this.state.showUpdate} book={this.state.book} categories={this.state.categories}/>);  
    }catch(error){
        console.log(error);
    }
    return <div>Not available</div>
  }*/


  /*setActionsToolbar(cell, row, formatExtraData, rowIndex) {
    let a = this;
    return (
        <ButtonToolbar>
                <Button variant="primary" onClick={() =>this.handleShowUpdate(this.state.books[rowIndex])}>Update</Button>
     
                <Button variant="danger" onClick={() =>this.handleDelete(row.id_book)}>Delete</Button>
         

        </ButtonToolbar>
    );
    }*/ 
  
  render() {
    return (
        <Picky
          placeholder="Seleccione fiscalía(s)"
          value={this.state.selectedFiscalias}
          options={this.state.fiscaliaOptions}
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

export default Fiscalias;