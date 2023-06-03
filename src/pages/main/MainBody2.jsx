import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sche1 from "./Sche1";
import Sche2 from "./Sche2";

const MainBody2 = () => {
  const [clothesData, setClothesData] = useState(null);

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const getClothesRecommendation = async () => {
      try {
        const currentDate = getCurrentDate();

        const response = await axios.get("/api/clothes/recommend", {
          params: {
            date: currentDate,
          },
          headers: {
            Cookie:
              "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
          },
        });
        setClothesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getClothesRecommendation();
  }, []);

  const handlePostData = async (topId, bottomId) => {
    try {
      const response = await axios.post(
        "/api/post",
        {
          topId,
          bottomId,
        },
        {
          headers: {
            Cookie:
              "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
          },
        }
      );
      console.log(response.data); // POST 요청에 대한 응답 처리
    } catch (error) {
      console.log(error);
    }
  };

  // top 배열 모으기
  const allTops = clothesData
    ? Object.values(clothesData).reduce((acc, meal) => {
        const tops = meal.clothes.top || [];
        return acc.concat(tops);
      }, [])
    : [];

  // bottom 배열 모으기
  const allBottoms = clothesData
    ? Object.values(clothesData).reduce((acc, meal) => {
        const bottoms = meal.clothes.bottom || [];
        return acc.concat(bottoms);
      }, [])
    : [];

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
      {clothesData && (
        <div className="flex flex-row mainBody">
          <div className="bodySlick">
            <Slider {...settings}>
              {allTops.map((top) => (
                <div key={top.id}>
                  <img src={top.imgUrl} alt={top.id} />
                  <a href={top.itemUrl}>상품 링크</a>
                </div>
              ))}
            </Slider>
          </div>
          <div className="bodySlick">
            <Slider {...settings}>
              {allBottoms.map((bottom) => (
                <div key={bottom.id}>
                  <img src={bottom.imgUrl} alt={bottom.id} />
                  <a href={bottom.itemUrl}>상품 링크</a>
                </div>
              ))}
            </Slider>
          </div>

          {/* 비로그인 상태  */}
          {/* <Sche1></Sche1> */}
          {/* 로그인 상태  */}
          <Sche2></Sche2>
        </div>
      )}
      {!clothesData && (
        <div className="flex flex-row mainBody">
          <div className="bodySlick">
            <Slider {...settings}>
              <div>
                <img src="https://image.brandi.me/cproduct/2023/02/10/SB000000000084505689_1675999480_image1_S.jpeg" />
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  상품 링크
                </a>
              </div>
              <div>
                <img src="https://image.brandi.me/cproduct/2023/02/10/SB000000000084505689_1675999480_image1_S.jpeg" />
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  상품 링크
                </a>
              </div>
            </Slider>
          </div>
          <div className="bodySlick">
            <Slider {...settings}>
              <div>
                <img src="https://image.brandi.me/cproduct/2023/02/10/SB000000000084505689_1675999480_image1_S.jpeg" />
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  상품 링크
                </a>
              </div>
              <div>
                <img src="https://image.brandi.me/cproduct/2023/02/10/SB000000000084505689_1675999480_image1_S.jpeg" />
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  상품 링크
                </a>
              </div>
            </Slider>
          </div>

          {/* 비로그인 상태  */}
          {/* <Sche1></Sche1> */}
          {/* 로그인 상태  */}
          <Sche2></Sche2>
        </div>
      )}
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

export default MainBody2;
