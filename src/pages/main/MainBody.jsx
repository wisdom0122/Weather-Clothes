import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sche1 from "./Sche1";
import Sche2 from "./Sche2";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

const MainBody = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();

  const [clothesData, setClothesData] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectClothes, setSelectClothes] = useState(false);

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

  const handlePostData = async () => {
    {
      if (isLoggedIn) {
        try {
          const currentTop = allTops[currentSlideIndex];
          const currentBottom = allBottoms[currentSlideIndex];

          // 스케줄 아이디값 로직
          let scheduleId = null;
          if (selectedScheduleId === "morning") {
            scheduleId = clothesData.morning.scheduleDetail?.id || null;
          } else if (selectedScheduleId === "afternoon") {
            scheduleId = clothesData.afternoon.scheduleDetail?.id || null;
          } else if (selectedScheduleId === "evening") {
            scheduleId = clothesData.evening.scheduleDetail?.id || null;
          }
          const response = await axios.post(
            "/api/clothes/choice",
            {
              topId: currentTop.id,
              bottomId: currentBottom.id,
              scheduleDetailId: scheduleId,

              // scheduleDetailId: currentScheduleDetail
              //   ? currentScheduleDetail.id
              //   : null, // scheduleDetail이 있는지 확인하고 id 추출
            },
            {
              headers: {
                Cookie:
                  "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
              },
            }
          );
          console.log(response.data); // POST 요청에 대한 응답 처리
          setSelectClothes(true);
          setTimeout(() => {
            setSelectClothes(false);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/login");
      }
    }
  };

  // top 배열 모으기
  const allTops = clothesData
    ? Object.values(clothesData).reduce((acc, meal) => {
        const tops = meal.clothes && meal.clothes.top ? meal.clothes.top : [];
        return acc.concat(tops);
      }, [])
    : [];

  const allBottoms = clothesData
    ? Object.values(clothesData).reduce((acc, meal) => {
        const bottoms =
          meal.clothes && meal.clothes.bottom ? meal.clothes.bottom : [];
        return acc.concat(bottoms);
      }, [])
    : [];

  const settings = {
    // 슬릭 슬라이더의 설정을 정의합니다.
    infinite: false,
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
            <Slider
              {...settings}
              afterChange={(index) => setCurrentSlideIndex(index)}
            >
              {allTops.map((top) => (
                <div key={top.id}>
                  <a href={top.itemUrl}>
                    <img src={top.imgUrl} alt={top.id} />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
          <div className="bodySlick">
            <Slider
              {...settings}
              afterChange={(index) => setCurrentSlideIndex(index)}
            >
              {allBottoms.map((bottom) => (
                <div key={bottom.id}>
                  <a href={bottom.itemUrl}>
                    <img src={bottom.imgUrl} alt={bottom.id} />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
          {!isLoggedIn ? <Sche1></Sche1> : <Sche2></Sche2>}
        </div>
      )}
      {!clothesData && (
        <div className="flex flex-row mainBody">
          <div className="bodySlick">
            <Slider {...settings}>
              <div>
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  옷을 불러오고 있습니다
                </a>
              </div>
              <div>
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  <img src="https://image.brandi.me/cproduct/2023/02/10/SB000000000084505689_1675999480_image1_S.jpeg" />
                </a>
              </div>
            </Slider>
          </div>
          <div className="bodySlick">
            <Slider {...settings}>
              <div>
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  옷을 불러오고 있습니다
                </a>
              </div>
              <div>
                <a href="https://www.brandi.co.kr/products/91657001?search-word=%EC%A0%B8%EC%A7%80">
                  <img src="https://image.brandi.me/cproduct/2023/02/10/SB000000000084505689_1675999480_image1_S.jpeg" />
                </a>
              </div>
            </Slider>
          </div>
          {!isLoggedIn ? <Sche1></Sche1> : <Sche2></Sche2>}
        </div>
      )}
      <div className="mainBody flex">
        <button className="styleSelect" onClick={handlePostData}>
          스타일 선택
        </button>
        {selectClothes && (
          <div className="successMessage">추천스타일에 저장 되었습니다.</div>
        )}
      </div>
      <style jsx>{`
        .bodySlick img {
          width: 400px;
          height: 360px;
        }
        .successMessage {
          transform: translateX(-93%);
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 61px;
          text-align: center;
          height: 61px;

          color: #3f8ded;
        }
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
        .styleSelect:hover {
          background: #3f8ded;
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
