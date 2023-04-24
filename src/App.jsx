import React from 'react';
import {Main} from './Main';
import {BrowserRouter as Router} from 'react-router-dom';
import Chatbot from './components/chatbot/chatbot';
import {Header} from './components/header/header';
import './App.css';

function App() {
  return (
    <Router>
      <Header></Header>
      <Main></Main>
      {/*<Chatbot></Chatbot>*/}
    </Router>
  );
}

export default App;
