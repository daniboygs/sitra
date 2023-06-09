import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Login} from './components/login/login';
import Home from './components/home/home';
import Carpets from './components/carpets/carpets';
import Victims from './components/victims/victims';
import Imputeds from './components/imputeds/imputeds';
import Binnacle from './components/binnacle/binnacle';
import './loged.css';

export const HomeMain = () => (
    <div style={{marginTop: '200px', width: '95%', marginLeft: '2%', marginRight: '2%', float: 'left'}}>
        <Switch>
            <Route exact path="/inicio" component={Home} /> 
            <Route exact path="/denuncias" component={Carpets} />      
            <Route exact path="/victimas" component={Victims} /> 
            <Route exact path="/imputados" component={Imputeds} /> 
            {/*<Route exact path="/binnacle" component={Binnacle} />*/} 
            <Route exact path="/carpets:request" component={Carpets} />
            <Route path="/" element={<Login />}></Route>
        </Switch>
    </div>
);