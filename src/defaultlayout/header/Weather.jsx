import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  // 일일 데이터
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const now = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const response = await axios.get("/api/weather/daily", {
          params: {
            now: now,
          },
        });

        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getWeatherData();
  }, []);
  // 시간별 데이터
  useEffect(() => {
    const getHourlyWeatherData = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");

        const response = await axios.get("/api/weather/hourly", {
          params: {
            now: `${year}-${month}-${day}-${hour}`,
          },
        });
        setHourlyWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHourlyWeatherData();
  }, []);
  return (
    <li className="weatherBox">
      {/* 날씨 데이터 표시 */}
      {weatherData ? (
        <div className="wetherBox flex row">
          <img
            className="weatherIcon"
            src={hourlyWeatherData.icon}
            alt="날씨아이콘"
          />
          <p className="currentTem">{hourlyWeatherData.temp}°</p>
          <p className="currentTem">{hourlyWeatherData.description}</p>
          <p className="lowTem">{weatherData.highestTemp}°</p> /{" "}
          <p className="highTem">{weatherData.lowestTemp}°</p>
          {/* 추가적인 날씨 정보 표시 */}
        </div>
      ) : (
        // 데이터가 없을떄 나오는 예시 이미지 입니다.
        <div className="wetherBox flex row justify-center">
          <img
            className="weatherIcon"
            src="https://openweathermap.org/img/wn/04n@2x.png"
            alt="날씨아이콘"
          />
          <p className="currentTem">15.0°</p>
          <p className="currentTem">흐림</p>
          <p className="lowTem">9.0°</p> <p>/</p>{" "}
          <p className="highTem">21.0°</p>
          {/* 추가적인 날씨 정보 표시 */}
        </div>
      )}
      <style jsx>{`
        .lowTem {
          color: #73abef;
          font-size: 1.5rem;
          margin: 0px 5px 0px 10px;
        }
        .highTem {
          color: tomato;
          font-size: 1.5rem;
          margin: 0px 0px 0px 5px;
        }
        .wetherBox p {
          line-height: 45px;
          height: 45px;
          margin-bottom: 0px;
        }
        .wetherBox {
          gap: 10px;
        }
        .weatherIcon {
          width: 45px;
          height: 45px;
        }
        .currentTem {
          font-size: 1.5rem;
          font-weight: 700;
          color: #000000;
        }
      `}</style>
    </li>
  );
};

export default Weather;
