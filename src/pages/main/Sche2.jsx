import React from "react";
import Note from "./Note";
import sche from "../../assets/images/sche.png";
import vecto from "../../assets/images/vecto.png";

const Sche2 = () => {
  return (
    <div className="flex flex-col scheAll">
      <div className="sche2 flex flex-row">
        <img src={sche} alt="스케쥴" />
        <p>2020.05.05</p>
        <img className="arrow" src={vecto} alt="화살표" />
      </div>
      {/* 메모장  */}
      <div className="scheMemo">
        <Note></Note>
      </div>
      <style jsx>
        {`
          .scheAll {
            margin: 0px 10px;
          }
          .scheMemo {
            width: 380px;
            height: 295px;
            background: #f8f5bd;
            border-radius: 30px;
          }
          .sche2 {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border: none;
            background: white;
            margin: 16px 15px;
          }
          .sche2 img {
            width: 111.81px;
            height: 100px;
            margin: 0px 20px;
          }
          .sche2 p {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            font-size: 25px;
            line-height: 34px;
            margin: 0px 10px;
          }
          .arrow {
            width: 20px !important;
            height: 20px !important;
          }
        `}
      </style>
    </div>
  );
};

export default Sche2;
