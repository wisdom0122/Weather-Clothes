import React from "react";
import "./Register.css"

import logo from "../../assets/images/sample_logo_3.png"

const Register = () => {
  return( 
  <div className="registerForm">
     <img src={logo} className="sampleLogo" alt="로고" />
      <p>E-mail</p>
      <input className="registerInput" />
      <input className="registerInput" id="registerInput-bottom"/>
      <p id="pwTitle">비밀번호</p>
      <input className="registerInput" />
      <input className="registerInput" placeholder="비밀번호 확인" id="registerInput-bottom"/>
      <p id="disagreeText">비밀번호가 일치하지 않습니다.</p>
      <p>이름</p>
      <input className="registerInput" />
      <button className="registerButton">가입하기</button>
      <button className="buttonConfirm" id="certifyButton">인증하기</button>
      <button className="buttonConfirm" >확 인</button>
      <span className="timer">05:00</span>
  </div>
  )
};

export default Register;
