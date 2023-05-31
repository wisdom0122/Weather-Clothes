import React from "react";
import write from "../../assets/images/image 11.png";
import recom from "../../assets/images/image 12.png";
import pick from "../../assets/images/image 10.png";

const MainHeader = () => {
  return (
    <div className="flex justify-around">
      <div className="mainHeader">
        <div>
          <img src={write} alt="write"></img>
          <p>일정을 기록하고</p>
        </div>
        <div>
          <img src={recom} alt="recom"></img>
          <p>한번에 추천 받고</p>
        </div>
        <div>
          <img src={pick} alt="pick"></img>
          <p>스타일을 고르고</p>
        </div>
      </div>
      <style jsx>{`
        .mainHeader {
          background: #3f8ded;
          display: flex;
          flex-direction: row;
          gap: 4rem;
          padding: 1rem;
          width: 80vw;
          border-radius: 10px;
          justify-content: center;
          height: 142px;
          line-height: 8px;
          align-items: center;
        }
        .mainHeader div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mainHeader img {
          border-radius: 50%;
          margin-bottom: 3%;
        }
        .mainHeader p {
          color: white;
          font-family: "Noto Sans";
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 0px;
        }
      `}</style>
    </div>
  );
};

export default MainHeader;
