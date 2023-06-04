import React, { useEffect, useState } from "react";
import axios from "axios";
import BookMarkSide from "./BookMarkSide";
import "./bookmark.css";

const Bookmark = () => {
  const [bookMarkMainTitle, setBookMarkMainTitle] = useState("내가 고른 옷");
  const sideTitles = ["내가 고른 옷", "다른 사람의 옷", "좋아요 한 옷"];

  const handleTitleClick = (title) => {
    setBookMarkMainTitle(title);
  };
  // 선택한 옷
  const [selectClothesData, setSelectClothesData] = useState(null);

  useEffect(() => {
    getMyClothesChoice();
  }, []);

  const getMyClothesChoice = async () => {
    try {
      const response = await axios.get("/api/clothes/choice/mine", {
        headers: {
          Cookie:
            "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
        },
        params: {
          size: 20,
        },
      });

      const data = response.data;
      // 받아온 데이터를 처리하고 상태 업데이트 등의 작업 수행
      setSelectClothesData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-row flex">
      <div className="bookMarkSide">
        {sideTitles.map((title) => (
          <BookMarkSide
            key={title}
            sideTitle={title}
            onClick={() => handleTitleClick(title)}
          />
        ))}
      </div>
      <div className="bookMarkMain">
        <div className="bookMarkMainTitle">{bookMarkMainTitle}</div>
        <ul className="itemList">
          {selectClothesData ? (
            selectClothesData.content.map((item) => (
              <li className="item" key={item.id}>
                <div className="flex flex-row clothesBox">
                  <img src={item.topChoice.imgUrl} alt="상의" />
                  <img src={item.bottomChoice.imgUrl} alt="하의" />
                </div>
                <div className="text">
                  <span>{item.date}</span>
                  <span>{item.tempAvg}</span>
                  <span>{item.plan}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="item">
              <div className="flex flex-row clothesBox">
                <img
                  src="https://image.brandi.me/cproduct/2022/01/14/SB000000000050236783_1642148911_image1_S.jpeg"
                  alt="상의"
                />
                <img
                  src="https://image.brandi.me/cproduct/2023/04/25/SB000000000093287746_1682418424_image1_S.jpeg"
                  alt="하의"
                />
              </div>
              <div className="text">
                <span>#선택날짜</span>
                <span>#평균기온</span>
                <span>#해당일정</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Bookmark;
