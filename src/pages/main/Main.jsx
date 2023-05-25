import React from "react";
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";

const Main = () => {
  return (
    <div className="mainSize">
      <MainHeader />
      <MainBody />
      <style jsx>{`
        .mainSize {
        }
      `}</style>
    </div>
  );
};

export default Main;
