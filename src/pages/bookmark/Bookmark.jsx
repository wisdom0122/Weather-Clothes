import React from "react";
import { styled } from "styled-components";

const Bookmark = () => {
  return( 
    <BookmarkPage>
    <div className="bookMarkSide"> 
    <div>내가 고른 옷</div>
    <div>다른 사람의 옷</div>
    <div>좋아요 한 옷</div>
  </div>
  <div className="bookMarkMain">
    <div className="bookMarkMainTitle">
     내가 고른 옷
    </div>
    <ul className="itemList">
      <li className="item">
        <div className="image"></div>
        <div className="text">
          <span>#선택날짜</span>
          <span>#평균기온</span>
          <span>#해당일정</span>
        </div>
      </li>
    </ul>
  </div>
  </BookmarkPage>
  )
};

export default Bookmark;

const BookmarkPage = styled.div`
  display: flex;
  margin-top: 57px;

.bookMarkSide{
  display: flex;
  flex-direction: column;
  gap:33px;
  margin: 140px 111px 0 255px;
  width: 125px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  letter-spacing: -0.05em;
  color: #000000;
}

.bookMarkMain{
  width: 1000px;
}

.bookMarkMainTitle {
  border-bottom: 4px solid #000000;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.07em;
  color: #000000;
  padding-bottom: 15px;
}

.itemList {
  margin-top: 41px;
}

.item{
  display: flex;
}

.image{
  width: 250px;
  height: 153px;
  background: #D9D9D9;
}

.text{
  display: flex;
  margin: 20px 0 0 14px;
  gap:13px;
  flex-direction: column;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}

`