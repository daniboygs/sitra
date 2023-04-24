import React from 'react';
import {Login} from './Login';
import {BrowserRouter as Router} from 'react-router-dom';
import Chatbot from './components/chatbot/chatbot';
import {Header} from './components/header/header';
import './App.css';

function Root() {
  return (
    <Router>
      <Login></Login>
      {/*<Chatbot></Chatbot>*/}
    </Router>
  );
}

export default Root;
