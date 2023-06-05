import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function CertifyModal({
  setOpenCertifyModal,
  setMyphoneNumber,
}) {
  const [timerId, setTimerId] = useState(null);
  const [timer, setTimer] = useState("05:00"); // 타이머 상태 변수
  const [timerVisible, setTimerVisible] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const startTimer = () => {
    let minutes = 5;
    let seconds = 0;

    const intervalId = setInterval(() => {
      // 1초마다 타이머 감소
      seconds--;
      if (seconds < 0) {
        minutes--;
        seconds = 59;
      }

      // 타이머가 0:00이 되면 타이머 정지
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
      }

      // 타이머를 "mm:ss" 형식으로 업데이트
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
      setTimer(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);

    // 타이머 ID를 상태 변수에 저장
    setTimerId(intervalId);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [numberOK, setNumberOK] = useState(false);

  const onChangePhone = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onChangeNumber = (e) => {
    setCheckNumber(e.target.value);
  };
  const closeCertifyModal = () => {
    setOpenCertifyModal(false);
  };

  const handleInsideClick = (event) => {
    event.stopPropagation();
  };

  const sendAuthRequest = async () => {
    const url = "/api/members/phone/auth-num";

    try {
      const response = await axios.post(
        url,
        { phone: phoneNumber },
        {
          headers: {
            Cookie:
              "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
          },
        }
      );

      // 응답 처리
      console.log(response.data); // 응답 데이터 출력
      startTimer();
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  // 인증번호 확인
  const checkRequest = async () => {
    const url = "/api/members/phone/auth-num/check";

    try {
      const response = await axios.post(
        url,
        { phone: phoneNumber, authNumber: checkNumber },
        {
          headers: {
            Cookie:
              "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
          },
        }
      );

      // 응답 처리
      console.log(response.data); // 응답 데이터 출력
      setNumberOK(response.data.result);
      clearInterval(timerId);
      setTimerVisible(false); // 타이머 표시 설정
    } catch (error) {
      // 에러 처리
      console.error(error);
      setWrongPassword(true);
    }
  };

  const certifyNumber = () => {
    setMyphoneNumber(phoneNumber);
  };
  return (
    <>
      <CertifyModalPage onClick={closeCertifyModal}>
        <CertifyModalForm onClick={handleInsideClick}>
          <CertifyModalFormTitle>
            휴대폰 인증
            <CloseButton onClick={closeCertifyModal}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4321 17.4426C19.6963 17.7068 19.8447 18.0651 19.8447 18.4387C19.8447 18.8123 19.6963 19.1706 19.4321 19.4348C19.1679 19.699 18.8096 19.8474 18.436 19.8474C18.0624 19.8474 17.7041 19.699 17.4399 19.4348L9.9997 11.9922L2.55713 19.4324C2.29295 19.6966 1.93464 19.845 1.56103 19.845C1.18743 19.845 0.82912 19.6966 0.564939 19.4324C0.300759 19.1683 0.152344 18.81 0.152344 18.4364C0.152344 18.0627 0.300759 17.7044 0.564939 17.4403L8.00752 10L0.567283 2.55744C0.303102 2.29326 0.154688 1.93496 0.154688 1.56135C0.154688 1.18774 0.303102 0.829437 0.567283 0.565257C0.831463 0.301076 1.18977 0.152661 1.56338 0.152661C1.93698 0.152661 2.29529 0.301076 2.55947 0.565257L9.9997 8.00784L17.4423 0.564085C17.7065 0.299904 18.0648 0.151489 18.4384 0.151489C18.812 0.151489 19.1703 0.299904 19.4345 0.564085C19.6986 0.828265 19.8471 1.18657 19.8471 1.56018C19.8471 1.93379 19.6986 2.29209 19.4345 2.55627L11.9919 10L19.4321 17.4426Z"
                  fill="white"
                />
              </svg>
            </CloseButton>
          </CertifyModalFormTitle>
          <CertifyModalFormContents>
            <span>전화번호</span>
            <div className="certifyItems">
              <input value={phoneNumber} onChange={onChangePhone} />
              <button
                className="blueButton"
                onClick={() => {
                  sendAuthRequest();
                  setTimerVisible(true); // 타이머 표시 설정
                }}
              >
                인증하기
              </button>
            </div>
            <div className="certifyItems">
              <input value={checkNumber} onChange={onChangeNumber} />
              <button
                className="blueButton"
                timerVisible={timerVisible}
                onClick={checkRequest}
                disabled={!timerVisible}
              >
                확 인
              </button>
            </div>
            {wrongPassword && (
              <p className="warningMessage">
                인증번호를 다시 한 번 확인해주세요!
              </p>
            )}
            <button onClick={certifyNumber} disabled={!checkNumber}>
              인증하기
            </button>
            {timerVisible && <div className="timer">{timer}</div>}
            <style jsx>{`
              .disable {
                background: ${(props) =>
                  props.timerVisible ? "#3f8ded" : "#d9d9d9"};
              }
            `}</style>
          </CertifyModalFormContents>
        </CertifyModalForm>
      </CertifyModalPage>
    </>
  );
}

const CertifyModalPage = styled.div`
  position: absolute;
  top: -50px;
  left: 0px;
  width: 100%;
  height: 138%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const CertifyModalForm = styled.div`
  margin: 272px auto 0 auto;
  width: 700px;
  height: 480px;
  background: #ffffff;
`;

const CertifyModalFormTitle = styled.div`
  background: #3f8ded;
  height: 70px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 41px;
  color: #ffffff;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const CertifyModalFormContents = styled.div`
  margin: 92px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-bottom: 8px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.07em;
    color: #000000;
  }

  .certifyItems {
    display: flex;
    margin-top: 17px;
    margin-left: 118px;
  }

  .timer {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #ff1c1c;
    position: absolute;
    left: 945px;
    top: 551px;
  }

  input {
    width: 225px;
    height: 35px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
  }

  .blueButton {
    margin: 0 0 0 15px;
    width: 93px;
    height: 40px;
    background: #3f8ded;
    border-radius: 20px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
  }
  .disable {
    background: ${(props) => (props.timerVisible ? "#3f8ded" : "#d9d9d9")};
  }
  button {
    width: 115px;
    height: 50px;
    margin-top: 12px;
    background: #ffffff;
    border: 2px solid #d9d9d9;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.03em;
    color: #000000;
  }

  .warningMessage {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #ff1c1c;
  }
`;

const CloseButton = styled.button`
  margin: 0 30px 0 225px;
`;
