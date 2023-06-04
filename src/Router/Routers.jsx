import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BaseRouter from "./BaseRouter";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Auth from "../pages/login/Auth";


const Routers = () => {
  return (
    <div>
    <Router>   
      <Routes>
        <Route exact path="/*" element={<BaseRouter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api/auth/kakao/callback" element={<Auth/>} />
        <Route path="/api/auth/naver/callback" element={<Auth/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default Routers;
