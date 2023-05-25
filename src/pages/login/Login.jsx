import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"

import logo from "../../assets/images/sample_logo_3.png"

const Login = () => {
  return( 
  <div className="loginForm">
     <img src={logo} className="logo" alt="로고" />
      <input className="formInput" placeholder="E-mail" />
      <input id ="formPw" className="formInput" placeholder="비밀번호"/>
      <div className="spanBox">
        <span>비밀번호 찾기</span>
        <div>
          <span>홈으로</span>
          <span id = "registerSpan">
            <Link to="/register">회원가입</Link>
          </span>
        </div>
      </div>
      <input className="formInput" placeholder="비밀번호를 찾으려는 이메일"/>
      <p id="text">
        이메일로 임시비밀번호가 발송되었습니다.
      </p>
      <button className="loginButton">로그인</button>
      <div className="socialLogin">카카오로그인</div>
      <div className="socialLogin">네이버로그인</div>
      <button className="confirmButton">확인</button>
  </div>
  )
};

export default Login;
