import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CertifyModal from "./modal/CertifyModal";
import ChangeModal from "./modal/ChangeModal";
import UpdateModal from "./modal/UpdateModal";

const Mypage = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCertifyModal, setOpenCertifyModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [myphoneNumber, setMyphoneNumber] = useState("");
  const [memberProfileData, setMemberProfiledata] = useState("");

  // axios, async/await 을 사용한 REST API 호출
  useEffect(() => {
    const fetchMemberProfile = async () => {
      const url = "/api/members/profile";
      const headers = {
        Cookie:
          "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
      };

      try {
        const response = await axios.get(url, { headers });
        // 성공적으로 회원정보를 조회한 경우에 대한 처리
        const memberProfile = response.data;
        // 회원정보를 사용하는 로직
        console.log("memberProfile", memberProfile);
        setMemberProfiledata(response.data);
      } catch (error) {
        // 요청이 실패한 경우에 대한 처리
        console.error("회원정보 조회 실패:", error);
      }
    };
    fetchMemberProfile();
  }, []);

  // const memberId = memberProfile.memberId;

  const handleUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCertifyModal = () => {
    setOpenCertifyModal(true);
  };

  const handleChangeModal = () => {
    setOpenChangeModal(true);
  };

  let myPageFormStyle = {
    width: "766px",
    paddingBottom: "27px",
    margin: "120px auto 100px auto",
  };

  let profileBoxStyle = {
    display: "flex",
  };

  let modalButton = {
    width: "115px",
    height: "50px",
    background: " #FFFFFF",
    border: "2px solid #D9D9D9",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "23px",
    letterSpacing: "0.03px",
    color: "#000000",
  };

  /* 내 정보, 비밀번호 변경 폰트css 재사용*/
  let text1 = {
    marginLeft: "20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "25px",
    lineHeight: "29px",
    display: "flex",
    justifyContent: "center",
    letterSpacing: "0.07em",
    color: "#000000",
  };

  /* 성별, 지역, 전화번호 폰트css 재사용*/
  let text2 = {
    marginLeft: "60px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "23px",
    display: "flex",
    justifyContent: "center",
    letterSpacing: "0.07em",
    color: "#000000",
  };

  const hidePhoneNumber = (myphoneNumber) => {
    const regex = /(\d{3})(\d{4})(\d{4})/;
    return myphoneNumber.replace(regex, "$1-****-****");
  };

  const maskedPhoneNumber = hidePhoneNumber(myphoneNumber);
  return (
    <>
      {openUpdateModal && (
        <UpdateModal
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
        />
      )}
      {openCertifyModal && (
        <CertifyModal
          openCertifyModal={openCertifyModal}
          setOpenCertifyModal={setOpenCertifyModal}
          setMyphoneNumber={setMyphoneNumber}
        />
      )}
      {openChangeModal && (
        <ChangeModal
          openChangeModal={openChangeModal}
          setOpenChangeModal={setOpenChangeModal}
        />
      )}
      <div className="myPageForm" style={myPageFormStyle}>
        <div className="profileBox" style={profileBoxStyle}>
          <div>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="1.5"
                width="117"
                height="117"
                rx="58.5"
                fill="white"
                stroke="#D9D9D9"
                stroke-width="3"
              />
              <path
                d="M60.0003 60C55.417 60 51.4934 58.3681 48.2295 55.1042C44.9656 51.8403 43.3337 47.9167 43.3337 43.3333C43.3337 38.75 44.9656 34.8264 48.2295 31.5625C51.4934 28.2986 55.417 26.6667 60.0003 26.6667C64.5837 26.6667 68.5073 28.2986 71.7712 31.5625C75.035 34.8264 76.667 38.75 76.667 43.3333C76.667 47.9167 75.035 51.8403 71.7712 55.1042C68.5073 58.3681 64.5837 60 60.0003 60ZM26.667 93.3333V81.6667C26.667 79.3056 27.2753 77.1347 28.492 75.1542C29.7087 73.1736 31.3225 71.6639 33.3337 70.625C37.6392 68.4722 42.0142 66.8569 46.4587 65.7792C50.9031 64.7014 55.417 64.1639 60.0003 64.1667C64.5837 64.1667 69.0975 64.7056 73.542 65.7833C77.9864 66.8611 82.3614 68.475 86.667 70.625C88.6809 71.6667 90.2962 73.1778 91.5128 75.1583C92.7295 77.1389 93.3364 79.3083 93.3337 81.6667V93.3333H26.667Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
          <div className="profileBoxText">
            <div className="name">
              {memberProfileData ? memberProfileData.name : "***"}님 반갑습니다
            </div>
            <p className="profileBoxTextContents">
              성별과 지역을 입력하시면 맞춤 AI 추천 서비스를 받으실 수 있습니다
            </p>
            <p className="profileBoxTextContents">
              *전화번호를 입력하시면 추천 스타일을 문자로 받으실 수 있습니다
            </p>
            <style jsx>{`
              .profileBoxText {
                display: flex;
                margin-left: 43px;
                flex-direction: column;
                justify-content: end;
              }
              .name {
                margin-bottom: 8px;
                font-family: "Noto Sans";
                font-style: normal;
                font-weight: 400;
                font-size: 30px;
                line-height: 41px;
                text-align: left;
                color: #000000;
              }
              .profileBoxTextContents {
                margin: 5px 0 0 0;
                color: #3f8ded;
                font-family: "Roboto";
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;
                display: flex;
                align-items: center;
                text-align: center;
              }
            `}</style>
          </div>
        </div>
        <div className="informBox">
          <div className="informBoxTop">
            <div id="informBoxTopleft">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9997 0.333332C19.2098 0.333332 21.3294 1.21131 22.8922 2.77411C24.455 4.33691 25.333 6.45653 25.333 8.66667C25.333 10.8768 24.455 12.9964 22.8922 14.5592C21.3294 16.122 19.2098 17 16.9997 17C14.7895 17 12.6699 16.122 11.1071 14.5592C9.54431 12.9964 8.66634 10.8768 8.66634 8.66667C8.66634 6.45653 9.54431 4.33691 11.1071 2.77411C12.6699 1.21131 14.7895 0.333332 16.9997 0.333332ZM16.9997 21.1667C26.208 21.1667 33.6663 24.8958 33.6663 29.5V33.6667H0.333008V29.5C0.333008 24.8958 7.79134 21.1667 16.9997 21.1667Z"
                  fill="#3F8DED"
                />
              </svg>
              <span style={text1}>내 정보</span>
            </div>
            <button style={modalButton} onClick={handleUpdateModal}>
              업데이트
            </button>
          </div>
          <div className="informBoxTop" id="informBoxMiddle">
            <div id="informBoxTopleft">
              <span style={text2}>성별</span>
            </div>
            <div id="informBoxTopleft">
              <span style={text2}>지역</span>
            </div>
            <div id="informBoxTopleft">
              <span style={text2}>전화번호 {maskedPhoneNumber}</span>
              <button style={modalButton} onClick={handleCertifyModal}>
                인증하기
              </button>
            </div>
          </div>
          <div className="informBoxTop" id="informBoxBottom">
            <div id="informBoxTopleft">
              <svg
                width="46"
                height="26"
                viewBox="0 0 46 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.583 19.25C14.3191 19.25 15.7948 18.6424 17.0101 17.4271C18.2254 16.2118 18.833 14.7361 18.833 13C18.833 11.2639 18.2254 9.78819 17.0101 8.57292C15.7948 7.35764 14.3191 6.75 12.583 6.75C10.8469 6.75 9.3712 7.35764 8.15592 8.57292C6.94065 9.78819 6.33301 11.2639 6.33301 13C6.33301 14.7361 6.94065 16.2118 8.15592 17.4271C9.3712 18.6424 10.8469 19.25 12.583 19.25ZM12.583 25.5C9.11079 25.5 6.1594 24.2847 3.72884 21.8542C1.29829 19.4236 0.0830078 16.4722 0.0830078 13C0.0830078 9.52778 1.29829 6.57639 3.72884 4.14583C6.1594 1.71528 9.11079 0.5 12.583 0.5C15.3955 0.5 17.8525 1.29861 19.9538 2.89583C22.0552 4.49306 23.5219 6.47222 24.3538 8.83333H40.9163C41.1941 8.83333 41.4636 8.88542 41.7247 8.98958C41.9858 9.09375 42.2024 9.23264 42.3747 9.40625L44.4059 11.4375C44.6143 11.6458 44.7705 11.8799 44.8747 12.1396C44.9788 12.3993 45.0309 12.6688 45.0309 12.9479C45.0309 13.2257 44.9879 13.4861 44.9018 13.7292C44.8156 13.9722 44.6677 14.1979 44.458 14.4062L39.0413 19.8229C38.833 20.0312 38.6073 20.1875 38.3643 20.2917C38.1212 20.3958 37.8608 20.4479 37.583 20.4479C37.3052 20.4479 37.0448 20.4042 36.8018 20.3167C36.5587 20.2292 36.333 20.0819 36.1247 19.875L33.4163 17.1667L30.708 19.875C30.4997 20.0833 30.274 20.2306 30.0309 20.3167C29.7879 20.4028 29.5275 20.4465 29.2497 20.4479C28.9719 20.4479 28.7115 20.4042 28.4684 20.3167C28.2254 20.2292 27.9997 20.0819 27.7913 19.875L25.083 17.1667H24.3538C23.4858 19.6667 21.9754 21.6806 19.8226 23.2083C17.6698 24.7361 15.2566 25.5 12.583 25.5Z"
                  fill="#3F8DED"
                />
              </svg>
              <span style={text1}>비밀번호 변경</span>
            </div>
            <button style={modalButton} onClick={handleChangeModal}>
              변경하기
            </button>
          </div>
          <style jsx>{`
            .informBox {
              margin-top: 44px;
              padding: 36px;
              width: 766px;
              background: #ffffff;
              border: 3px solid #d9d9d9;
            }
            .informBoxTop {
              display: flex;
              justify-content: space-between;
              padding-bottom: 14px;
            }
            #informBoxTopleft {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 49px;
            }

            #informBoxMiddle {
              padding-top: 25px;
              display: flex;
              flex-direction: column;
              border-top: 2px solid #d9d9d9;
              border-bottom: 2px solid #d9d9d9;
            }

            #informBoxBottom {
              display: flex;
              align-items: center;
              margin-top: 20px;
              height: 50px;
              padding-bottom: 0;
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default Mypage;
