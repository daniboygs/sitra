import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Years from '../catalogs/years';
import Fiscalias from '../catalogs/fiscalias';
import Cities from '../catalogs/cities';
import Crimes from '../catalogs/crimes';
import Requests from '../catalogs/requests';
import { MDBIcon, MDBBtn } from 'mdbreact';
import band from '../../assets/img/cintilla.png';
import imputedIcon from '../../assets/icons/encabezado_imputados.png';
import './style/style.css';

class Query extends React.Component{
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
      <div id={this.props.queryStyle} className="shadow-box z-depth-5" style={this.props.showForm?{display: 'block'}:{display: 'none'}}>
                
        <div style={{width: '100%', paddingTop: '10px', display: 'inline', height: '80px' }}>

          <img src={imputedIcon} style={{width: '50px', height: '50px', margin: '14px', float: 'left'}} />

          <h1 style={{fontSize: 'xx-large', width: '75%', height: '50px', textAlign: 'center', fontFamily: 'LabradorA', color: '#152F4A', margin: '0 auto', padding: '14px', float: 'left'}}>IMPUTADOS</h1>

          {
            this.props.showQuery?

            <div style={{margin: '10px', float: 'right', alignItems: 'center', display: 'flex'}}>
              <OverlayTrigger
                  placement={'top'}
                  overlay={
                  <Tooltip>
                      <strong>Minimizar</strong>.
                  </Tooltip>
                  }
              >
                  <a style={{margin: '0 auto'}} onClick={()=>this.props.handleShowForm(false)}><MDBIcon icon="minus-square" size="2x"/></a>
              </OverlayTrigger>{' '}
            </div>
          :
            null
          }
          
        </div>

        <img src={band} style={{width: '100%'}} />

        <label className="queryLabel" style={{paddingTop: '10px'}}>Año</label>
        <div className="queryDiv">
          <Years callbackYears={this.props.handleGetYears} callbackSelectedYears={this.props.handleChangeSelectedYears} />
          {this.props.showYearsAlert?
          <p className="queryAlert">Seleccione alguna opción</p>
          :null}
          <hr/>
        </div>

        <label className="queryLabel">Fiscalía</label>
        <div className="queryDiv">
          <Fiscalias callbackFiscalias={this.props.handleGetFiscalias} callbackSelectedFiscalias={this.props.handleChangeSelectedFiscalias} />
          {this.props.showFiscaliasAlert?
          <p className="queryAlert">Seleccione alguna opción</p>
          :null}
          <hr/>
        </div>

        {this.props.selectedFiscaliasID.length?
        <div>
          <label className="queryLabel">Municipio</label>
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

        <label className="queryLabel">Delito</label>
        <div className="queryDiv">
          <Crimes callbackCrimes={this.props.handleGetCrimes} callbackSelectedCrimes={this.props.handleChangeSelectedCrimes}  />
          {this.props.showCrimesAlert?
          <p className="queryAlert">Seleccione alguna opción</p>
          :null}
        </div>

        <br/>

        <label className="queryLabel">Variables a incluir en la consulta</label>
        <div className="queryDiv">
          <Requests callbackRequests={this.props.handleGetRequests} callbackSelectedRequests={this.props.handleChangeSelectedRequests} requestType="imputed"  />
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