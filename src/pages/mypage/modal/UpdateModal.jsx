import React from "react";
import styled from "styled-components";

export default function updateModal({ setOpenUpdateModal }) {
  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleInsideClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <UpdateModalPage onClick={closeUpdateModal}>
        <UpdateModalForm onClick={handleInsideClick}>
          <UpdateModalFormTitle>
            내 정보 변경
            <CloseButton onClick={closeUpdateModal}>
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
          </UpdateModalFormTitle>
          <UpdateModalFormContents>
            <div className="radio">
              <span>성별</span>
              <input type="radio" name="sex" value="man" />
              <label id="man">남성</label>
              <input type="radio" name="sex" value="woman" />
              <label>여성</label>
            </div>
            <div className="selectBox">
              <span>지역</span>
              <select>
                <option key="seoul value=" seoul>
                  강남
                </option>
                <option key="seoul value=" seoul>
                  서초
                </option>
              </select>
            </div>
            <p className="warningMessage">성별과 지역 모두를 입력해주세요!</p>
            <button>업데이트</button>
          </UpdateModalFormContents>
        </UpdateModalForm>
      </UpdateModalPage>
    </>
  );
}

const UpdateModalPage = styled.div`
  position: absolute;
  top: -50px;
  left: 0px;
  width: 100%;
  height: 130%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const UpdateModalForm = styled.div`
  margin: 272px auto 0 auto;
  width: 700px;
  height: 480px;
  background: #ffffff;
`;

const UpdateModalFormTitle = styled.div`
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
const UpdateModalFormContents = styled.div`
  width: 222px;
  margin: 92px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    margin-top: 35px;
    display: flex;
    justify-content: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #ff1c1c;
  }
  span {
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
    margin-right: 48px;
  }
  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
  }

  input {
    margin-right: 6px;
  }

  #man {
    margin-right: 40px;
  }

  .selectBox {
    display: flex;
    margin-top: 47px;

    select {
      width: 130px;
      height: 30px;
      background-color: #d9d9d9;
    }
  }
`;

const CloseButton = styled.button`
  margin: 0 30px 0 225px;
`;
