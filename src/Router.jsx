import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./defaultlayout/header/Navbar";
import Bookmark from "./pages/bookmark/Bookmark";
import Mypage from "./pages/mypage/Mypage";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" />
        <Route path="/bookmark" component={Bookmark} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/login" component={Login} />
      </Routes>
    </Router>
  );
};

export default App;
