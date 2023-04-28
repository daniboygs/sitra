import React, { useState } from 'react';
import {Main} from './Main';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chatbot from './components/chatbot/chatbot';
import {Header} from './components/header/header';
import './App.css';
import { RequireAuth } from "react-auth-kit";
import { MainApp } from "./MainApp";
import { Login } from "./Login";

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }


  return (
    <div>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <MainApp onFormSwitch={toggleForm} />
      }
    </div>
    
    
  );
}

/*


<Router>
      <Header></Header>
      <Main></Main>
      <Chatbot></Chatbot>
      </Router>


function App() {
  return (
    <Router>
      <Header></Header>
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <HomeMain />
          </RequireAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
    </Router>
  );
}*/

export default App;
