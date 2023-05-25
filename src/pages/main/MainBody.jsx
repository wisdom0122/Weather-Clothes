import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainBody = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/clothes/recommend?date=2023-05-17",
          {
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);
  const settings = {
    // 슬릭 슬라이더의 설정을 정의합니다.
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex flex-row">
      <div className="bodySlick">
        <Slider {...settings}>
          <div className="test1"></div>
          <div className="test2"></div>
        </Slider>
      </div>
      <style jsx>{`
        .bodySlick {
          width: 360px;
          height: 390px;
          overflow: hidden;
        }
        .test1 {
          background-color: black;
          width: 360px;
          height: 390px;
        }
        .test2 {
          background-color: tomato;
          width: 360px;
          height: 390px;
        }
      `}</style>
    </div>
  );
};

export default MainBody;
