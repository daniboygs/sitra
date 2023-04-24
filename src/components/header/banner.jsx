import * as React from 'react';
import logo from '../../assets/img/logo.png';

export const Banner = () => (
  <div id='banner' style={{height: '100px', width: '100%', backgroundColor: '#FFFFFF'}}>
      <img src={logo} style={{height: '73px', width: '250px',  margin: '13px', float: 'left'}}/>
      <h1 style={{width: '70%', height: '50px', textAlign: 'center', fontFamily: 'LabradorA', color: '#152F4A', margin: '0 auto', padding: '14px'}}>SISTEMA DE TRANSPARENCIA</h1>
  </div>
);