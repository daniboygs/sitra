import * as React from 'react';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';


class Requests extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        requestOptions: [],
        requests: [],
        selectedRequests: []
    }

    this.fillRequests = this.fillRequests.bind(this);
    this.setRequestsOptions = this.setRequestsOptions.bind(this);

    this.selectMultipleOptions = this.selectMultipleOptions.bind(this);

  }

  componentDidMount(){
    this.fillRequests(this.props.requestType);
  }

  fillRequests = (type) => {
    const requests="";
    switch(type){
      case "carpet":
          this.requests=[
            "Cometido con violencia",
            "Tipo de arma"
          ];
      break;
      case "victim":
          this.requests=[
            "Sexo",
            "Edad",
            "Escolaridad",
            "Profesión",
            "Nacionalidad",
            "Tipo de arma"
          ];
      break;
      case "imputed":
          this.requests=[
            "Sexo",
            "Edad",
            "Escolaridad",
            "Profesión",
            "Nacionalidad",
            "Parentesco",
            "Tipo de arma",
            "Detenido"
          ];
      break;
    }
      
    this.setState({
        requests: this.requests
    });
    this.setRequestsOptions();
  }

  setRequestsOptions=()=>{
    if(this.state.requests.length>0){
      console.log(this.state.requests);
      setTimeout(
          function() {

            let options = [];
            let requests = this.state.requests;

            requests.forEach(myFunction);
            
            function myFunction(request) {
              options.push(request);
            }
            this.setState({
              requestOptions: [...new Set(options)]
            })
            this.props.callbackRequests([...new Set(options)]);
          }
          .bind(this),
          300
      );
    }
    else{
      setTimeout(
        function(){
          this.setRequestsOptions();
        }
        .bind(this),
        300
      )
    }
  }

  selectMultipleOptions(value) {
    console.log("Val", value);
    this.setState({ 
      selectedRequests: value 
    });
    this.props.callbackSelectedRequests(value);
  }
  
  render() {
    return (
        <Picky
          placeholder="Seleccione consulta"
          value={this.state.selectedRequests}
          options={this.state.requestOptions}
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

export default Requests;