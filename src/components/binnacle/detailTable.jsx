import * as React from 'react';
import {Col, Row, Button, Modal, Card, ListGroup} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getDetailBinnacle } from './../Service';
import { MDBIcon, MDBRow, MDBCol, MDBPagination, MDBPageItem, MDBPageNav, MDBListGroup, MDBListGroupItem, MDBContainer, MDBBtnGroup, MDBBtn } from 'mdbreact';
import { element } from 'prop-types';

class DetailTable extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        data: [],
        showModal: this.props.showModal,
        binnacleID: this.props.binnacleID,
        queryID: this.props.queryID,
        petition: this.props.petition,
        page: [],
        downloadIndex: 0,
        downloadLength: 0,
        pagination: [],


        test: []
    }

    this.detailContent = this.detailContent.bind(this);

    this.pagination = this.pagination.bind(this);

    this.depureContent = this.depureContent.bind(this);

  }

componentDidMount(){
    /*this.props.callbackShowLoading(true);
    setTimeout(
        function(){
            this.props.callbackShowLoading(false);
        }
        .bind(this),
        100
    );*/
    getDetailBinnacle(this.props.binnacleID).then((response => {
        this.setState({
            data: response.data,
            downloadLength: response.data[0].Descargas
        });
        this.pagination(this.state.downloadIndex);
        //this.props.callbackShowLoading(false);
        console.log("data",response.data);
    }));
}

pagination(index){
    console.log(index)
    const elements = [], pages = [];

    elements.push(
        <div key="1" style={{textAlign: "center"}}>
            <MDBBtnGroup>
                <button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', fontSize: '10px', textAlign: 'center', backgroundColor: '#E9CFB8', borderColor: '#26DDE9', fontWeight: 'bold'}} onClick={()=>this.pagination(0)}>{"<<"}</button>
                {index-1>=0?<button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', fontSize: '10px', textAlign: 'center', backgroundColor: '#E9CFB8', fontWeight: 'bold'}} onClick={()=>this.pagination(index-1)}>{"<"}</button>:<button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', fontSize: '10px', textAlign: 'center', backgroundColor: '#E9CFB8', borderColor: '#26DDE9', fontWeight: 'bold'}}>{"<"}</button>}
                <button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', textAlign: 'center', backgroundColor: '#C09F77 ', fontWeight: 'bold', color: 'white'}}>{index}</button>
                {index+1<=this.state.downloadLength?<button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', fontSize: '10px', textAlign: 'center', backgroundColor: '#E9CFB8', borderColor: '#26DDE9', fontWeight: 'bold'}} onClick={()=>this.pagination(index+1)}>{">"}</button>:<button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', fontSize: '10px', textAlign: 'center', backgroundColor: '#E9CFB8', borderColor: '#26DDE9', fontWeight: 'bold'}}>{">"}</button>}
                <button type="button" style={{marginLeft: '5px', marginRight: '5px', border: '0', width: '50px', height: '50px', padding: '7px 10px', borderRadius: '25px', fontSize: '10px', textAlign: 'center', backgroundColor: '#E9CFB8', borderColor: '#26DDE9', fontWeight: 'bold'}} onClick={()=>this.pagination(this.state.downloadLength)}>{">>"}</button>
            </MDBBtnGroup>
        </div>
    );
    this.setState({
        pagination: elements
    })
    this.setState({
        test:   
            <div style={{width: "100%"}}>
                {this.detailContent(index)}
            </div>
    });

}

detailContent(page){

    let data = [], petitions = [], characteristics = [];
    let i = 0;

    data = this.depureContent(page);

    for(var petition in data){

        for(let characteristic in data[petition]){
            if((i%2)==0){
                characteristics.push(<div key={data[petition][characteristic]} style={{width: '32%', display: 'inline-block', float: 'left'}}><MDBIcon icon="circle" /> {data[petition][characteristic]}</div>);
            }
            else if((i%3)==0){
                characteristics.push(<div key={data[petition][characteristic]} style={{width: '32%', display: 'inline-block', float: 'left'}}><MDBIcon icon="circle" /> {data[petition][characteristic]}</div>);
            }
            else{
                characteristics.push(<div key={data[petition][characteristic]} style={{width: '32%', display: 'inline-block', float: 'right'}}><MDBIcon icon="circle" /> {data[petition][characteristic]}</div>);
            }
            i++;
        }

        if(characteristics.length>0){
            petitions.push(

                <ListGroup key={petition} style={{ width: '98%', marginBottom: '10px'}}> 
                <ListGroup.Item style={{ textAlign: "center", background: '#152F4A', color: 'white' }}>
                    {petition}
                </ListGroup.Item>
                <ListGroup.Item style={{textAlign: 'left', color: 'grey'}} >{characteristics}</ListGroup.Item>
                </ListGroup>
            );
        }

        

        characteristics = [];
        i = 0;
    }

    return(
        <div style={{width: "100%"}}>
            {petitions}
        </div>
    );
}

depureContent(page){

    let data = [];

    for(var detalle in this.state.data){
        if(this.state.data[detalle].Descarga==page){
            data.push(this.state.data[detalle]);
        }
    }

    const petitions = {
        Estatus: [],
        Sexo: [],
        Edad: [],
        Escolaridad: [],
        Profesión: [],
        Nacionalidad: [],
        Parentesco: [],
        "Cometido con violencia": [],
        'Tipo de arma': [],
        Año: [],
        Mes: [],
        Fiscalía: [],
        Municipio: [],
        Delito: []
    }

    for(var detail in data){
        petitions[data[detail].Peticion].push(data[detail].Caracteristica);
    }

    return petitions;

}
  
  render() {
    return (
        <>

            <h1 style={{color: 'white'}} >Detalle</h1>

            <div style={{height: "500px", overflowY: 'scroll'}}>
                {this.state.test}
            </div>
            <hr/>
            {this.state.pagination}

        </>
    );
  }
}

export default DetailTable;