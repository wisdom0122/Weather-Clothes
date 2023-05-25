import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import Navbar from "./defaultlayout/header/Navbar";
import Bookmark from "./pages/bookmark/Bookmark";
import Mypage from "./pages/mypage/Mypage";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />}> */}
        <Route index element={<Main />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/mypage" element={<Mypage />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
