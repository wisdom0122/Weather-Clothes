import React, { useEffect, useState } from "react";
import axios from "axios";
import BookMarkSide from "./BookMarkSide";
import "./bookmark.css";

const Bookmark = () => {
  const [bookMarkMainTitle, setBookMarkMainTitle] = useState("내가 고른 옷");
  const sideTitles = ["내가 고른 옷", "다른 사람의 옷", "좋아요 한 옷"];
  const [selectClothesData, setSelectClothesData] = useState(null);
  const [page, setPage] = useState(0); // 페이지 번호 상태

  const handleTitleClick = (title) => {
    setBookMarkMainTitle(title);
  };

  useEffect(() => {
    getMyClothesChoice();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 등록
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // 스크롤이 페이지 하단에 도달하면 데이터 가져오기
      loadMoreData();
    }
  };

  const getMyClothesChoice = async () => {
    try {
      const response = await axios.get("/api/clothes/choice/mine", {
        headers: {
          Cookie: "accessToken=your-access-token", // 액세스 토큰 값을 설정해야 합니다.
        },
        params: {
          size: 20,
          page: 0, // 초기 페이지 번호는 0입니다.
        },
      });

      const data = response.data;
      setSelectClothesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreData = async () => {
    try {
      const response = await axios.get("/api/clothes/choice/mine", {
        headers: {
          Cookie: "accessToken=your-access-token", // 액세스 토큰 값을 설정해야 합니다.
        },
        params: {
          size: 20,
          page: page + 1, // 다음 페이지 번호로 데이터 요청합니다.
        },
      });

      const newData = response.data;
      setSelectClothesData((prevData) => ({
        ...prevData,
        content: [...prevData.content, ...newData.content], // 이전 데이터와 새로운 데이터를 결합합니다.
      }));
      setPage((prevPage) => prevPage + 1); // 페이지 번호 업데이트
    } catch (error) {
      console.log(error);
    }
  };

  let bookmarkStyle = {
    height: "750px",
  };

  return (
    <div
      className="flex-row flex overflow-scroll bookmarkPage"
      style={bookmarkStyle}
    >
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
