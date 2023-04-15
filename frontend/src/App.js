import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/ChatPage";
import Navbar from "./components/Navbar"
import './App.css';

import { init } from "./firebase";

init();

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/tutor" element={<Chat />} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
