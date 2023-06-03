import React,{ useState,useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Login.css"
import logo from "../../assets/images/sample_logo_3.png"


const Login = () => {

const [showInput, setShowInput] = useState(false);
const [showText, setShowText] = useState(false);


const handleClick = () => {
  setShowInput(true);
};

const handlebButtonClick = () => {
  setShowText(true);
};  


  // KAKAO restAPI 사용 로그인 & env파일에 인증키 숨겨서 사용
  const KAKAO_CLIENT_ID = process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  // 리다이렉션 페이지로이동
  const handleKakaoLogin= () => {
  window.location.href = KAKAO_AUTH_URL;
}

  // 인가코드 추출
  const kakaoCode = new URL(window.location.href).searchParams.get("code");
  console.log(kakaoCode)


//----------------------------------------------------

// NAVER 로그인 & env파일에 인증키 숨겨서 사용
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URL;
  const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + NAVER_CLIENT_ID + '&redirect_uri=' + encodeURI(NAVER_REDIRECT_URI) + '&state=' + Math.random().toString(36).substr(3, 14);

  // 리다이렉션 페이지로이동
  const handleNaverLogin =()=>{
    window.location.href = NAVER_AUTH_URL;
   
  }

  // 인가코드 추출
  const naverCode = new URL(window.location.href).searchParams.get("code");
  console.log(naverCode)

  // 비밀번호 찾기
  useEffect(() => {
  const findMemberPassword = async (email) => {
    const url = '/api/members/password/find';
    const data = {
      email: email
    };
  
    try {
      const response = await axios.post(url, data);
      // 비밀번호 재설정 이메일을 전송한 후에 수행할 작업
      console.log('비밀번호 재설정 이메일 전송됨:', response.data);
    } catch (error) {
      // 요청이 실패한 경우에 대한 처리
      console.error('비밀번호 찾기 요청 실패:', error);
    }
  };
  findMemberPassword();
}, []);

// 비밀번호 수정
useEffect( ()=>{
const updateMemberPassword = async (newPassword) => {
  const url = '/api/members/password';
  const headers = {
    'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None',
  };
  const data = {
    newPassword: newPassword
  };

  try {
    const response = await axios.patch(url, data, { headers });
    // 비밀번호 수정 후에 수행할 작업
    console.log('비밀번호 수정 완료:', response.data);
  } catch (error) {
    // 요청이 실패한 경우에 대한 처리
    console.error('비밀번호 수정 실패:', error);
  }
};

updateMemberPassword();
},[]);
  
  return( 
  <div className="loginForm">
     <img src={logo} className="logo" alt="로고" />
      <input className="formInput" placeholder="E-mail" />
      <input id ="formPw" className="formInput" placeholder="비밀번호"/>
      <div className="spanBox">
        <span onClick={handleClick} >비밀번호 찾기</span>
        <div>
          <Link to="/">홈으로</Link>
          <span id = "registerSpan">
            <Link to="/register">회원가입</Link>
          </span>
        </div>
      </div>
      {showInput && <div><input className="formInput" placeholder="비밀번호를 찾으려는 이메일" />
        <button className="confirmButton" onClick={handlebButtonClick} >확인</button>
        </div> }
        {showText && <p id="text">
         이메일로 임시비밀번호가 발송되었습니다.
        </p> }
      <button className="loginButton">로그인</button>
      <div className="socialLogin" onClick={handleKakaoLogin}>카카오로그인</div>
      <div className="socialLogin" onClick={handleNaverLogin}>네이버로그인</div>
  </div>
  )
};

export default Login;
