import React from 'react';
import {Main} from './Main';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chatbot from './components/chatbot/chatbot';
import {Header} from './components/header/header';
import './App.css';
import { RequireAuth } from "react-auth-kit";
import { HomeMain } from "./Home";

function MainApp() {
  return (
    <Router>
      <Header></Header>
      <Main></Main>
      {/*<Chatbot></Chatbot>*/}
    </Router>
  );
}

/*
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

export default MainApp;
