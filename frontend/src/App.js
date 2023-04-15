import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Authenticate from "./components/Authenticate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/ChatPage";
import Navbar from "./components/Navbar";

import { init } from "./firebase";

init();

function App() {
  return (
    // <AuthContextProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/login" elmement={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/tutor" element={<Chat />} />
        <Route exact path="/" element={<Authenticate component={Home} />} />
      </Routes>
    </BrowserRouter>
    // </AuthContextProvider>
  );
}

export default App;
