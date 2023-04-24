import * as React from 'react';
import { Button } from 'react-bootstrap';
import Years from '../catalogs/years';
import Fiscalias from '../catalogs/fiscalias';
import Cities from '../catalogs/cities';
import Crimes from '../catalogs/crimes';
import Requests from '../catalogs/requests';
import { MDBIcon, MDBBtn } from 'mdbreact';

import band from '../../assets/img/cintilla.png';
import folderIcon from '../../assets/icons/encabezado_carpetas.png';

class Query extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =  {
        queryStyle: this.props.queryStyle
    }

  }

  componentDidMount(){
  }
  
  render() {
    return (
        <div id={this.props.queryStyle} className="shadow-box z-depth-5">

          <div style={{width: '100%', paddingTop: '10px', display: 'inline', height: '80px' }}>
            <img src={folderIcon} style={{width: '50px', height: '50px', margin: '14px', float: 'left'}} />

            <h1 style={{width: '70%', height: '50px', textAlign: 'center', fontFamily: 'LabradorA', color: '#152F4A', margin: '0 auto', padding: '14px'}}>CARPETAS</h1>
          </div>

          <img src={band} style={{width: '100%'}} />

          <label className="queryLabel" style={{paddingTop: '10px'}}><MDBIcon icon="archive" /> Años</label>
          <div className="queryDiv">
            <Years callbackYears={this.props.handleGetYears} callbackSelectedYears={this.props.handleChangeSelectedYears} />
            {this.props.showYearsAlert?
            <p className="queryAlert">Seleccione alguna opción</p>
            :null}
            <hr/>
          </div>

          <label className="queryLabel"><MDBIcon icon="landmark" /> Fiscalías</label>
          <div className="queryDiv">
            <Fiscalias callbackFiscalias={this.props.handleGetFiscalias} callbackSelectedFiscalias={this.props.handleChangeSelectedFiscalias} />
            {this.props.showFiscaliasAlert?
            <p className="queryAlert">Seleccione alguna opción</p>
            :null}
            <hr/>
          </div>

          {this.props.selectedFiscaliasID.length?
          <div>
            <label className="queryLabel"><MDBIcon icon="map-marker-alt" /> Municipios</label>
            <div className="queryDiv">
              <Cities callbackSetCitiesById={this.props.callbackSetCitiesById} callbackCities={this.props.handleGetCities} callbackSelectedCities={this.props.handleChangeSelectedCities} />
              {this.props.showCitiesAlert?
              <p className="queryAlert">Seleccione alguna opción</p>
              :null}
              <hr/>
            </div>
          </div>
          :
            null
          }

          <label className="queryLabel"><MDBIcon icon="haykal" /> Delitos</label>
          <div className="queryDiv">
            <Crimes callbackCrimes={this.props.handleGetCrimes} callbackSelectedCrimes={this.props.handleChangeSelectedCrimes}  />
            {this.props.showCrimesAlert?
            <p className="queryAlert">Seleccione alguna opción</p>
            :null}
          </div>

          <br/>

          <label className="queryLabel"><MDBIcon icon="bars" /> Consulta</label>
          <div className="queryDiv">
            <Requests callbackRequests={this.props.handleGetRequests} callbackSelectedRequests={this.props.handleChangeSelectedRequests} requestType="carpet"  />
            {this.props.showRequestsAlert?
            <p className="queryAlert">Seleccione alguna opción</p>
            : null}
            <hr/>
          </div>

          <div style={{width: '100%', textAlign: 'center', marginBottom: '10px'}}>
            <MDBBtn color="default" onClick={()=>this.props.handleProcess()}>Aceptar</MDBBtn>
          </div>

        </div>
    );
  }
}

export default Query;