import React from "react";
import sche from "../../assets/images/sche.png";

const Sche1 = () => {
  return (
    <div className="bodySlick sche">
      <img src={sche} alt="스케쥴" />
      <p>
        당신을 위한 AI서비스와 함께
        <br />
        당신의 일정으로 W&C의
        <br />
        옷장을 채워보세요
      </p>
      <style jsx>
        {`
          .sche {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: none;
            background: white;
          }
          .sche img {
            width: 200px;
            height: 178.87px;
            margin: 0px 0px 45px;
          }
          .sche p {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            font-size: 25px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Sche1;
