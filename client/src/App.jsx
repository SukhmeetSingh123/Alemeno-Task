import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle"
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import DashBoard from "./Components/dashBoard";
import Home from "./Components/Home";
import SingleCourseDetail from "./Components/SingleCourseDetail";
import NavBar from "./Components/NavBar";
const App=()=> {

  return (
      <Router>
        <GlobalStyle/>
        <NavBar/>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/course/:id" element={<SingleCourseDetail/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/dashboard" element={<DashBoard  />}/>
          </Routes>
      </Router>
  )
}

export default App
