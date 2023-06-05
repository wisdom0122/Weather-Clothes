import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Bookmark from "../pages/bookmark/Bookmark";
import Main from "../pages/main/Main";
import Mypage from "../pages/mypage/Mypage";
import Navbar from "../defaultlayout/header/Navbar";
import Footer from "../defaultlayout/footer/Footer";

const BaseRouter = () => {
  const location = useLocation();
  const shouldRenderFooter = location.pathname !== "/bookmark";

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      {shouldRenderFooter && <Footer />}
    </>
  );
};

export default BaseRouter;
