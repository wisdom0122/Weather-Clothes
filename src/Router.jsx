import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./defaultlayout/header/Navbar";
import Bookmark from "./pages/bookmark/Bookmark";
import Mypage from "./pages/mypage/Mypage";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
