import React, { useState } from "react";
import sche from "../../assets/images/sche.png";
import vecto from "../../assets/images/vecto.png";
import NoteApp from "./NoteApp";

const Sche2 = ({ setSelectedScheduleId }) => {
  const [date, setDate] = useState(new Date());

  // date 객체를 "2023-05-15" 형식의 문자열로 변환
  const postdate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const incrementDate = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    if (currentDate <= maxDate) {
      setDate(currentDate);
    }
  };

  const formattedDate = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="flex flex-col scheAll">
      <div className="sche2 flex flex-row">
        <img src={sche} alt="스케쥴" />
        <p>{formattedDate()}</p>
        <img
          className="arrow"
          src={vecto}
          alt="화살표"
          onClick={incrementDate}
        />
      </div>
      {/* 메모장  */}
      <div className="scheMemo">
        <NoteApp
          postdate={postdate}
          setSelectedScheduleId={setSelectedScheduleId}
        />
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
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Sche2;
