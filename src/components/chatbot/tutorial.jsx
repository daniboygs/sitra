import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getQueryBinnacle } from '../Service';
import { MDBIcon } from 'mdbreact';
import { Button, ButtonGroup } from 'react-bootstrap';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import logo from '../../assets/gif/tutorial/dinamicalTable.gif';


class Tutorial extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
    }

  }
  //<a class="rsc-float-button sc-fjdhpX chatbotBtn"><MDBIcon Style={{color:'white'}} icon="robot" /></a>

  componentDidMount(){
  }
  render() {
    return(
        <>
            <img src={logo} alt="loading..." />
        </>
        
    );
  }
}

export default Tutorial;