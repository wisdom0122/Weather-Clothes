import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sche1 from "./Sche1";
import Sche2 from "./Sche2";

const MainBody = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/clothes/recommend", {
        withCredentials: true,
        headers: {
          Cookie:
            "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  const settings = {
    // 슬릭 슬라이더의 설정을 정의합니다.
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      <div className="flex flex-row mainBody">
        <div className="bodySlick">
          <Slider {...settings}>
            <div className="test1"></div>
            <div className="test2"></div>
          </Slider>
        </div>
        <div className="bodySlick">
          <Slider {...settings}>
            <div className="test1"></div>
            <div className="test2"></div>
          </Slider>
        </div>

        {/* 비로그인 상태  */}
        {/* <Sche1></Sche1> */}
        {/* 로그인 상태  */}
        <Sche2></Sche2>
      </div>
      <div className="mainBody flex">
        <button className="styleSelect">스타일 선택</button>
      </div>
      <style jsx>{`
        .styleSelect {
          background: #eef0f3;
          border-radius: 20px;
          width: 235px;
          height: 61px;
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 25px;
          line-height: 34px;
          text-align: center;
          color: #000000;
          transform: translateX(-93%);
        }
        .mainBody {
          margin: 33px 0px;
          width: 100vw;
          justify-content: center;
        }
        .bodySlick {
          width: 400px;
          height: 430px;
          padding: 35px 35px;
          margin: 0px 15px;
          border: 1px solid #e2e2e2;
          background: #eef0f3;
          border-radius: 10px;
        }
        .sche {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: none;
          background: white;
        }

        .test1 {
          background-color: black;
          width: 300px;
          height: 360px;
        }
        .test2 {
          background-color: tomato;
          width: 360px;
          height: 360px;
        }
        .slick-prev:before,
        .slick-next:before {
          color: black !important;
        }
         {
          /* 슬릭슬라이더 내장 화살표 스타일 */
        }
      `}</style>
    </div>
  );
};

export default MainBody;
