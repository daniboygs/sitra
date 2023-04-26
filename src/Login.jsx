import React, { useState } from "react";
import fge_logo from './assets/img/FGE.png';

export const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        window.location.href = '/inicio';
        //window.location.href = '172.16.2.27:8081/inicio';
    }

    return (
        <div className="auth-form-container">
            <form className="login-form login-form-body" onSubmit={handleSubmit}>

                <div class="login-form-header">

                    <img src={fge_logo} style={{width: "200", height: "200"}} class="user-logo"/>
                    
        
                    <h1 class="font-weight-normal login-form-text">INICIO DE SESIÓN</h1>
                    
                </div>
                {/*<label htmlFor="user">user</label>*/}
                <input value={user} onChange={(e) => setUser(e.target.value)}type="text" placeholder="Usuario" id="user" name="user" className="form-control"/>
                <br></br>
                {/*<label htmlFor="password">password</label>*/}
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Contraseña" id="password" name="password" className="form-control"/>
                <br></br>
                <button type="submit" class="btn btn-lg btn-outline-primary btn-block">Log In</button>
            </form>
            {/*<button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>*/}
        </div>
    )
}