import React from 'react';
import {Banner} from './banner';
import NavbarComponent from './navbar';

export const Header = () => (
  <div style={{position: 'fixed', width: '100%', display: 'block', top: '0', left: '0', zIndex: '100'}}>
    <Banner></Banner>
    <NavbarComponent></NavbarComponent>
  </div>
);