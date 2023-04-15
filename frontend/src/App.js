import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";
import Authenticate from "./components/Authenticate";
import { ChatContextProvider } from "./context/ChatContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import Welcome from "./pages/welcome";

import { init } from "./firebase";
import TeacherDashboard from "./pages/Teacher-Dashboard";

init();

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Inter", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/tutor"
                element={<Authenticate component={Chat} />}
              />
              <Route exact path="/" element={<Welcome />} />
              <Route
                exact
                path="/teacher-dashboard"
                element={<Authenticate component={TeacherDashboard} />}
              />
              <Route
                exact
                path="/"
                element={<Authenticate component={Home} />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
