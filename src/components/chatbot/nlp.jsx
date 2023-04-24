import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MDBIcon } from 'mdbreact';
import { Button, ButtonGroup } from 'react-bootstrap';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import logo from '../../assets/gif/tutorial/dinamicalTable.gif';
import PropTypes from 'prop-types';
import { PorterStemmerES } from 'natural';
import { NeuralNetwork } from 'brain.js';
import { Corpora, featuresToDict, chain } from "evaluate-nlp";
import http from 'http';
import { getCrimes, getFiscalias, getCities, getStatus, getWeapons, getProfessions, getScholarships, getNationalities, getRelationships, getYears } from '../Service';

import { getCrimeSinonim, getCarpetCrime, getCarpetCrimeYear, getCarpetCrimePeriodYear, getCarpetCrimeYearAndYear } from '../Service';

//import { NlpManager } from 'node-nlp';

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['es'] });
// Adds the utterances and intents for the NLP
/*manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');
 
// Train also the NLG
manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'see you soon!');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const readline = require('readline');
//const { NlpManager } = require('../../lib');
const trainnlp = require('./nlpTraining');

const threshold = 0.5;
const nlpManager = new NlpManager({ languages: ['es'] });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const requests = {
  years: [],
  crimes: [],
  fiscalias: [],
  cities: [],
  status: [],
  weapons: [],
  professions: [],
  nationalities: [],
  relationships: [],
  scholarships: [],
  sinonims: []
}

class NLP extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        prevProps: props,
        petition: this.props.previousStep.value,
        response: '...',
        requests: requests,
        years: [],
        crimes: [],
    }

    this.process = this.process.bind(this);

    this.think = this.think.bind(this);

    this.validate = this.validate.bind(this);

    this.depure = this.depure.bind(this);

    this.getDepuratedCrimes = this.getDepuratedCrimes.bind(this);

    this.depuratePrepotitions = this.depuratePrepotitions.bind(this);
    this.depuratePronouns = this.depuratePronouns.bind(this);

    this.validateYear = this.validateYear.bind(this);
    //this.validateCrime = this.validateCrime.bind(this);

    this.getRequests = this.getRequests.bind(this);

  }
  //<a class="rsc-float-button sc-fjdhpX chatbotBtn"><MDBIcon Style={{color:'white'}} icon="robot" /></a>

  componentDidMount(){
    console.log(this.state.prevProps);

    let value = this.props.previousStep.value;
    let lowerize = value.toLowerCase();
    let tokenize = lowerize.split(/\W+/);

    this.setState({
      lowerize: lowerize,
      tokenize: tokenize,
    });

    this.getRequests();

    let nonPrepo = this.depuratePrepotitions(lowerize);


    console.log("nonPrepo",nonPrepo);
    let nonPron = this.depuratePronouns(nonPrepo);
    console.log("nonPron",nonPron);



    this.validateYear(nonPron);



    this.think(nonPron);
    
  }

  getRequests(){

    getCrimes().then((response)=>{
      requests.crimes=response.data;
    });

    getFiscalias().then((response)=>{
      requests.fiscalias=response.data;
    });

    getCities().then((response)=>{
      requests.cities=response.data;
    });

    getStatus().then((response)=>{
      requests.status=response.data;
    });

    getWeapons().then((response)=>{
      requests.weapons=response.data;
    });

    getProfessions().then((response)=>{
      requests.professions=response.data;
    });

    getScholarships().then((response)=>{
      requests.scholarships=response.data;
    });

    getNationalities().then((response)=>{
      requests.nationalities=response.data;
    });

    getRelationships().then((response)=>{
      requests.relationships=response.data;
    });

    getYears().then((response)=>{
      requests.years=response.data;
    });

    getCrimeSinonim().then((response)=>{
      requests.sinonims=response.data;
    });

    this.setState({
      requests: requests
    })

    
  }

  getDepuratedCrimes(){

    let crimes = [], depuratedCrimes = [];

    getCrimes().then((response)=>{
      crimes = response.data;
    });

    crimes.forEach(myFunction);
    
    function myFunction(crime) {
      depuratedCrimes.push(this.depuratePrepotitions(crime.Grupo));
    }

    this.setState({
      crimes: [...new Set(depuratedCrimes)]
    });

  }

  depuratePrepotitions(value){
    let prepotitions = ["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "en", "entre", "hacia", "hasta", "para", "por", "según", "sin", "so", "sobre", "tras", "durante", "mediante", "versus", "vía"];
    let articles = ["al", "del"];
    let depuratedValues = "";


    let tokenize = value.split(/\W+/);

    let trim = tokenize.filter(x => x !== "");
    let lowerize = trim.map(x => x.toLowerCase());

    
    lowerize.forEach(myFunction);
    
    function myFunction(element) {
      if(!prepotitions.includes(element) && !articles.includes(element)){
        depuratedValues += element+" ";
      }
    }

    return depuratedValues;

  }

  depuratePronouns(value){
    let pronouns = ["yo","me","mi","conmigo","tu","te","ti","contigo","usted","vos","el","lo","le","se","si","consigo","ella","la","ello","lo","nosotros","nos","nosotras","vosotros","vosotras","os","ustedes","ellos","ellas","los","las","les","se","si","consigo"];
    let depuratedValues = "";

    let lowerize = value.toLowerCase();
    let tokenize = lowerize.split(/\W+/);

    tokenize.forEach(myFunction);
    
    function myFunction(element) {
      if(!pronouns.includes(element)){
        depuratedValues += element+" ";
      }
    }
    
    return depuratedValues;

  }

  validate(){

    let newValue = '';
    let lowerize = this.state.lowerize;
    let tokenize = this.state.tokenize;

    tokenize.forEach(element => {





      newValue += this.validateYear(element)+' ';
    });

    return newValue;

            
    
  }

  validateYear(value){

    if(!isNaN(value)){

      let years = this.state.requests.years;

      if(value>1800 && value<2100){

        years.push(value);
        
        requests.years = years;
         
        return 'año.true';
      }
        
      else{
        return value;
      }
    } 
    
    else{
      return value;
    }

  }


  depure(answer){

    let requests = [];

    console.log(answer);

    var options = answer.split('/').map(function (a) {
      return({a});
    });

    let option = options[0].a;


    console.log(options);

    switch(option){

      case 'peticion años': 

        console.log(this.state.years.length );

        if(this.state.years.length > 1){
          let years = '';
          this.state.years.forEach(year => {
            years += year+' ';
          });
          this.setState({
            response: ('Las peticiones de los años '+years)
          });
        }

        else{
          this.setState({
            response: 'Haga de nuevo su consulta con valores validos'
          });
        }

        break;




      case 'C': 

        requests = {
          crime: options[1].a
        };

        localStorage.setItem('option', option);
        localStorage.setItem('requests', JSON.stringify(requests));

        console.log(requests);

        this.props.reedirect('carpets');

        this.setState({
          response: "Tengo este resultado para ti"
        });

        break;


      case 'CY': 

        requests = {
          crime: options[1].a,
          year: options[2].a
        };
  
        localStorage.setItem('option', option);
        localStorage.setItem('requests', JSON.stringify(requests));
  
        console.log(requests);
  
        this.props.reedirect('carpets');
  
        this.setState({
          response: "Tengo este resultado para ti"
        });
  
        break;

      case 'CYY': 

        requests = {
          crime: options[1].a,
          year: [options[2].a, options[3].a]
        };
  
        localStorage.setItem('option', option);
        localStorage.setItem('requests', JSON.stringify(requests));
  
        console.log(requests);
  
        this.props.reedirect('carpets');
  
        this.setState({
          response: "Tengo este resultado para ti"
        });
  
        break;

      case 'CPY': 

        requests = {
          crime: options[1].a,
          year: options[2].a
        };
  
        localStorage.setItem('option', option);
        localStorage.setItem('requests', JSON.stringify(requests));
  
        console.log(requests);
  
        this.props.reedirect('carpets');
  
        this.setState({
          response: "Tengo este resultado para ti"
        });
  
        break;

      


      default:
          this.setState({
            response: answer
          })
        break;
    }



  }


  process(){
    console.log("q hubo")
    this.props.callbackChangeMessage("¿Te puedo ayudar en algo más?");

    const tokenize = str => str.split(/\W+/);
    
    const text = this.props.previousStep.value;
    const tokenized = tokenize(text);

    console.log(tokenized);


    const trim = arr => arr.filter(x => x !== "");
    const lowerize = arr => arr.map(x => x.toLowerCase());
    const stem = arr => arr.map(x => PorterStemmerES.stem(x));

console.log(trim);
console.log(lowerize);
console.log(stem);

    /*const utteranceToText = str =>
      chain(str, tokenize, trim, lowerize, stem, featuresToDict);
    const nlpEngine = { 
      createNetwork: () =>
        new NeuralNetwork({
          hiddenLayers: [],
          activation: "leaky-relu",
          errorThresh: 0.00005,
          learningRate: 0.1
        }),
      train: (net, xs, ys) => {
        return net.train(
          xs.map((x, i) => {
            return { input: utteranceToText(x), output: { [ys[i]]: 1 } };
          })
        );
      },
      predict: (net, x) => net.run(utteranceToText(x))
    };

    const result = new Corpora().compareSigdial22(nlpEngine);

    console.log(result);*/

  }

  think(petition){
    /*(async () => {
      await trainnlp(nlpManager, this.state.requests);
        const result = await nlpManager.process(this.validate());

        this.depure(result.answer);
        
    })();*/

    //console.log(this.state.requests);

    (async () => {
      await trainnlp(nlpManager, this.state.requests);
        //const result = await nlpManager.process(this.props.previousStep.value);

        const result = await nlpManager.process(petition);

        console.log(result);

        if(result.answer){
          this.depure(result.answer);

        }
          
        
    })();

    //this.validate();
    /*(async () => {
      await trainnlp(nlpManager, this.say);
      this.say('Say something!');
      if (this.props.previousStep.value.toLowerCase() === 'quit') {
        this.setState({
          petition: 'Adios'
        });
        this.say("Adios");
      } else {
        const result = await nlpManager.process(this.props.previousStep.value);
        const answer =
          result.score > threshold && result.answer
            ? result.answer
            : "Sorry, I don't understand";
        let sentiment = '';
        if (result.sentiment.score !== 0) {
          sentiment = `  ${result.sentiment.score > 0 ? ':)' : ':('}   (${
            result.sentiment.score
          })`;
        }
        this.say(`bot> ${answer}${sentiment}`);
      }
    })();*/

    // Adds the utterances and intents for the NLP
/*manager.addDocument('es', 'adios', 'greetings.adios');
manager.addDocument('es', 'adios cuidate', 'greetings.adios');
manager.addDocument('es', 'nos vemos', 'greetings.adios');
manager.addDocument('es', 'hasta la proxima', 'greetings.adios');
manager.addDocument('es', 'debo irme', 'greetings.adios');
manager.addDocument('es', 'me ire', 'greetings.adios');
manager.addDocument('es', 'hola', 'greetings.hola');
manager.addDocument('es', 'holi', 'greetings.hola');
manager.addDocument('es', 'hola robot', 'greetings.hola');
manager.addDocument('es', 'hello', 'greetings.hola');

// Train also the NLG
manager.addAnswer('es', 'greetings.adios', 'Hasta la proxima');
manager.addAnswer('es', 'greetings.adios', 'Nos vemos');
manager.addAnswer('es', 'greetings.hola', 'Hola');
manager.addAnswer('es', 'greetings.hola', 'Que tal');

// Train and save the model.
(async() => {
    //await manager.train();
    //manager.save();
    const response = await manager.process('es', this.props.previousStep.value);
    this.setState({
      response: response.answer
    })
    console.log(response);
    console.log(response.answer);
})();
*/

  }

  render() {
    return(
        <>
          {this.state.response}
        </>
        
    );
  }
}


export default NLP;