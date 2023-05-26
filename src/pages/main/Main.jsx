import React from "react";
<<<<<<< HEAD

const Main = () => {
  return (
    <div>
      <div className="MainMainMain">ddaaa</div>
      <style jsx>{`
        .MainMainMain {
          width: 500px;
          height: 500px;
          border: 1px solid black;
          background-color: black;
          z-index: 20;
=======
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";

const Main = () => {
  return (
    <div className="mainSize">
      <MainHeader />
      <MainBody />
      <style jsx>{`
        .mainSize {
>>>>>>> cde5a9de60abc0586be6f052a11c6e3a836e0b12
        }
      `}</style>
    </div>
  );
};

export default Main;
