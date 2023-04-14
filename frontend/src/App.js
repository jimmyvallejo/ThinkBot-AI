import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Chat from "./pages/ChatPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { init } from "./firebase";

init();

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tutor" element={<Chat />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppContextProvider>

  );
}

export default App;
