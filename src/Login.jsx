import React, { useState } from "react";
import fge_logo from './assets/img/fge_nav.png';
import './login.css';
import { getAuth, getIP} from './components/Service';
import ReactNotification, {store} from 'react-notifications-component';

export const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        //document.getElementById("head_test").style.display =" !important";
        console.log(user);

        getAuth([user, pass]).then((response) => {
            console.log(response.data);

            if(response.data.auth){
                props.onFormSwitch('main');
            }
            else{
                switch(response.data.code){
                    case 2:
                        store.addNotification({
                            title: "Usuario o contraseña incorrectos",
                            message: "Ingrese un usuario valido",
                            type: "danger",
                            insert: "top",
                            container: "top-center",
                            animationIn: ["animated", "bounceIn", 'faster'],
                            animationOut: ["animated", "bounceOut", 'faster'],
                            dismissable: { click: true },
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            },
                            width: 500
                        });
                        break;
                    case 3:
                        break;
                    default:
                }
            }
            
        }).catch(
            (error)=>{
                /*this.props.loading();
                this.props.notify('Oops something went wrong', 'error'); 
                this.handleClose();  */
                this.setState({
                    showLoading: false
                });
                console.log(error);
                store.addNotification({
                    title: "Error",
                    message: "Algo Salio mal",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    },
                    width: 300
                });
            }
        );

        //window.location.href = '/inicio';
        //window.location.href = '172.16.2.27:8081/inicio';



 
    }

    return (
        <>
            <ReactNotification />
            <div className="auth-form-container">
            <form className="login-form login-form-body" onSubmit={handleSubmit}>

                <div className="login-form-header">

                    <img src={fge_logo} style={{width: "200", height: "200"}} className="user-logo"/>
                    
        
                    <h1 className="font-weight-normal login-form-text">INICIO DE SESIÓN</h1>
                    
                </div>
                {/*<label htmlFor="user">user</label>*/}
                <input value={user} onChange={(e) => setUser(e.target.value)}type="text" placeholder="Usuario" id="user" name="user" className="form-control"/>
                <br></br>
                {/*<label htmlFor="password">password</label>*/}
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Contraseña" id="password" name="password" className="form-control"/>
                <br></br>
                <button type="submit" className="btn btn-lg btn-outline-primary btn-block">Log In</button>
            </form>
            {/*<button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>*/}
        </div>
        </>
    )
}