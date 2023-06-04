import React, {useState} from 'react'
import axios from 'axios';
import styled from 'styled-components';
export default function ChangeModal({setOpenChangeModal}) {

  const [password, setPassword] = useState('');

  const closeChangeModal =() => {
    setOpenChangeModal(false)
  }

  const handleInsideClick = (event) => {
    event.stopPropagation();
  };

  // 회원정보 비밀번호 수정
const handlePWUpdate = () => {

  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU';
  const headers = {
    Cookie: `accessToken=${accessToken}; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None`,
  };

  const data = {
    password : password
  };

  axios.put('/api/members/password', data, { headers })
    .then(response => {
      console.log('회원 정보 업데이트 성공:', response.data);
      // 성공적으로 업데이트된 경우 수행할 작업
    })
    .catch(error => {
      console.error('회원 정보 업데이트 실패:', error);
      // 업데이트 실패 시 처리할 작업
    });
  };


  return (
    <>
    <ChangeModalPage onClick={closeChangeModal}>
      <ChangeModalForm onClick={handleInsideClick}>
        <ChangeModalFormTitle>비밀번호 변경
          <CloseButton onClick={closeChangeModal}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4321 17.4426C19.6963 17.7068 19.8447 18.0651 19.8447 18.4387C19.8447 18.8123 19.6963 19.1706 19.4321 19.4348C19.1679 19.699 18.8096 19.8474 18.436 19.8474C18.0624 19.8474 17.7041 19.699 17.4399 19.4348L9.9997 11.9922L2.55713 19.4324C2.29295 19.6966 1.93464 19.845 1.56103 19.845C1.18743 19.845 0.82912 19.6966 0.564939 19.4324C0.300759 19.1683 0.152344 18.81 0.152344 18.4364C0.152344 18.0627 0.300759 17.7044 0.564939 17.4403L8.00752 10L0.567283 2.55744C0.303102 2.29326 0.154688 1.93496 0.154688 1.56135C0.154688 1.18774 0.303102 0.829437 0.567283 0.565257C0.831463 0.301076 1.18977 0.152661 1.56338 0.152661C1.93698 0.152661 2.29529 0.301076 2.55947 0.565257L9.9997 8.00784L17.4423 0.564085C17.7065 0.299904 18.0648 0.151489 18.4384 0.151489C18.812 0.151489 19.1703 0.299904 19.4345 0.564085C19.6986 0.828265 19.8471 1.18657 19.8471 1.56018C19.8471 1.93379 19.6986 2.29209 19.4345 2.55627L11.9919 10L19.4321 17.4426Z" fill="white"/>
            </svg>
          </CloseButton>
        </ChangeModalFormTitle>
        <ChangeModalFormContents>
          <div className='changeItem'>
            <span>변경 비밀번호</span>
            <input value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button onClick={handlePWUpdate}>변경하기</button>
        </ChangeModalFormContents>
      </ChangeModalForm>
    </ChangeModalPage>
    </>
  )
}

const ChangeModalPage = styled.div`
  position: absolute;
  top:-50px;
  left: 0px;
  width: 100%;
  height: 130%;
  background-color:rgba(0, 0, 0, 0.6);
`

const ChangeModalForm = styled.div`
  margin: 272px auto 0 auto;
  width: 700px;
  height: 480px;
  background: #FFFFFF;
`
const ChangeModalFormTitle = styled.div`
  background: #3F8DED;
  height: 70px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 41px;
  color: #FFFFFF;
  display: flex;
  justify-content: right;
  align-items: center;
  `


const ChangeModalFormContents = styled.div`
  margin: 92px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .changeItem{
    display: flex;
    gap:23px;
    margin: 50px 23px 80px 70px;
  }

  span {
    font-family: 'Roboto';
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

  input {
    box-sizing: border-box;
    width: 231px;
    height: 35px;
    border: 1px solid #D9D9D9;
  }

  button{
    width: 115px;
    height: 50px;
    margin-top: 12px;
    background: #FFFFFF;
    border: 2px solid #D9D9D9;
    font-family: 'Roboto';
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
`

  const CloseButton = styled.button`
  margin: 0 30px 0 225px;
  
`;