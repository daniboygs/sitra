import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getQueryBinnacle } from '../Service';
import { MDBIcon } from 'mdbreact';
import { Button, ButtonGroup } from 'react-bootstrap';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Tutorial from './tutorial';
import NLP from './nlp';
import { Redirect } from 'react-router-dom';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Roboto',
  headerBgColor: '#113D69',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#113D69',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const config = {
  width: "300px",
  height: "400px",
  floating: true,
  reedirect: false,
  section: '/'
};

/*const steps = [
  {
    id: '0',
    message: 'Hola!, Bienvenido a SITRA',
    trigger: '1',
  },
  {
    id: '1',
    message: this.state.message,
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    component: (
      <NLP ></NLP>
    ),
    asMessage: true,
    trigger: '1',
  },
  {
    id: '4',
    message: 'Hi {previousValue}, nice to meet you!',
    end: true,
  },
];*/


class Chatbot extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
      message: "¿En que te puedo ayudar?",
      reedirect: false
    }
    
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeReedirect = this.handleChangeReedirect.bind(this);

  }
  //<a class="rsc-float-button sc-fjdhpX chatbotBtn"><MDBIcon Style={{color:'white'}} icon="robot" /></a>

  componentDidMount(){
  }

  handleChangeMessage(message){
    
    this.setState({
      message: message
    });
    console.log("llegue", message);
    console.log("estoy", this.state.message);
  }


  handleChangeReedirect(section){
    console.log(section+" | "+this.state.section);
    if(section==this.state.section){
      //window.location.reload();
      this.setState({
        reedirect: true,
        section: '/'
      });
  
      setTimeout(
        function(){
          this.setState({
            reedirect: false
          }); 
        }
        .bind(this),
        100
      );
    }
    else{
      this.setState({
        reedirect: true,
        section: section
      });
  
      setTimeout(
        function(){
          this.setState({
            reedirect: false
          }); 
        }
        .bind(this),
        100
      );
    }
  }


  render() {
    return(
        <>
        {this.state.reedirect?
          <Redirect to={'/'+this.state.section} />
        :
        null}
        <ThemeProvider theme={theme}>
          <ChatBot steps={
            [
              {
                id: '0',
                message: 'Hola!, Bienvenido a SITRA',
                trigger: '1',
              },
              {
                id: '1',
                message: this.state.message,
                trigger: '2',
              },
              {
                id: '2',
                user: true,
                trigger: '3',
              },
              {
                id: '3',
                component: (
                  <NLP reedirect={this.handleChangeReedirect} callbackChangeMessage={this.handleChangeMessage}></NLP>
                ),
                asMessage: true,
                trigger: '2',
              },
              {
                id: '4',
                message: 'Hi {previousValue}, nice to meet you!',
                end: true,
              },
            ]
          } {...config} headerTitle="Chatbot" />
        </ThemeProvider>
        </>
        
    );
  }
}

export default Chatbot;