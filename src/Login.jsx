import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import Carpets from './components/carpets/carpets';
import Victims from './components/victims/victims';
import Imputeds from './components/imputeds/imputeds';
import Binnacle from './components/binnacle/binnacle';

export const Login = () => (
    <div class={"login-form"} id={"login-form"}>

			<div class="login-form-header">
				
				<img class={"user-logo"} src={"assets/img/fge.png"} alt="" width={"200"} height={"200"}>
	
				<h1 class="font-weight-normal login-form-text">INICIO DE SESIÓN</h1>
				
			</div>

			<div class="login-form-body">

				<input id="user" name="user" type="text" class="form-control" placeholder="Usuario" required autofocus>
			
				<br>

				<input id="pass" name="pass" type="password" class="form-control" placeholder="Contraseña" required>

				<br>

				<button class="btn btn-lg btn-outline-primary btn-block" type="submit" class="botonlg" id="login" >Acceder</button>

			</div>
			
			

	</div>
);