import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import logo from "../../assets/images/sample_logo_3.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 보낼 이메일 저장
  const [password, setPassword] = useState(""); // 비밀번호 저장
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인
  const [name, setName] = useState(""); // 이름 저장

  const [isPasswordMatched, setIsPasswordMatched] = useState(true); // 비밀번호 일치 여부 상태

  const [authKey, setAuthKey] = useState(""); // 인증키 저장
  const [timer, setTimer] = useState(300); // 초 단위로 5분(300초) 설정
  const [isTimerStarted, setIsTimerStarted] = useState(false); // 타이머 시작 여부 상태
  const [isAuthCodeChecked, setIsAuthCodeChecked] = useState(false); // 인증 번호 확인
  const [allowSign, setAllowSign] = useState(false); // 인증 번호 확인

  //이메일 저장 함수
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordMatched(e.target.value === passwordConfirm);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setIsPasswordMatched(e.target.value === password);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // 인증키 저장 함수
  const handleAuthKeyChange = (e) => {
    setAuthKey(e.target.value);
  };

  // 인증 POST 요청을 위해 axios를 사용
  const handleVerificationCodeRequest = async () => {
    try {
      const response = await axios.post("/api/auth/email/auth-key", {
        email: email,
      });
      console.log("인증번호 보낸 이메일:", email);
      console.log("인증번호 요청 성공:", response.data);
      setIsTimerStarted(true); // 인증번호 요청 성공 시 타이머 시작
      // 필요한 추가 로직 작성
    } catch (error) {
      console.error("인증번호 요청 실패:", error.response.data);

      // 필요한 추가 로직 작성
    }
  };

  // 인증 확인 POST
  const handleAuthCodeCheck = async () => {
    try {
      const response = await axios.post("/api/auth/email/auth-key/check", {
        email: email,
        authKey: authKey,
      });
      console.log("인증코드 확인 성공:", response.data);
      // 인증 확인 값 저장 (true or false가 저장되어있음)
      setIsAuthCodeChecked(response.data.result);
      // 필요한 추가 로직 작성
    } catch (error) {
      console.error("인증코드 확인 실패:", error.response.data);
      // 필요한 추가 로직 작성
    }
  };
  // 회원가입 정보 POST
  const handleSignUp = async () => {
    try {
      const signUpData = {
        email: email,
        password: passwordConfirm,
        name: name,
        emailAuthResult: isAuthCodeChecked,
      };

      const response = await axios.post("/api/auth/sign-up", signUpData);
      console.log("회원가입 정보 전송 성공:", response.data);
      navigate("/login");
      // 필요한 추가 로직 작성
    } catch (error) {
      console.error("회원가입 정보 전송 실패:", error.response.data);
      alert("회원가입에 실패했습니다.");
      // 필요한 추가 로직 작성
    }
  };
  // 회원가입 유효성 최종
  const handleClickSignIn = async () => {
    if (
      isAuthCodeChecked &&
      isPasswordMatched &&
      password.length > 1 &&
      name > 1
    ) {
      setAllowSign(true);
      await handleSignUp();
    }
  };

  // 타이머 값을 '분:초' 형식으로 변환하는 함수
  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  };

  // 숫자를 2자리로 만들어주는 함수 (0을 추가)
  const padZero = (value) => {
    return String(value).padStart(2, "0");
  };

  useEffect(() => {
    let intervalId;

    if (isTimerStarted && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      setIsTimerStarted(false);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerStarted, timer]);

  return (
    <div className="registerForm">
      <img src={logo} className="sampleLogo" alt="로고" />
      <p>E-mail</p>
      <input
        className="registerInput"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className="registerInput"
        id="registerInput-bottom"
        value={authKey}
        onChange={handleAuthKeyChange}
      />
      <p id="pwTitle">비밀번호</p>
      <input
        className="registerInput"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        className="registerInput"
        placeholder="비밀번호 확인"
        id="registerInput-bottom"
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
      />
      {!isPasswordMatched ? (
        <p id="disagreeText">비밀번호가 일치하지 않습니다.</p>
      ) : (
        <p id="correct"></p>
      )}
      <p>이름</p>
      <input
        className="registerInput"
        value={name}
        onChange={handleNameChange}
      />
      <button
        className={allowSign ? "registerButton" : "registerButton signAllow"}
        onClick={handleClickSignIn}
        disabled={allowSign}
      >
        가입하기
      </button>
      <button
        className="buttonConfirm"
        id="certifyButton"
        onClick={handleVerificationCodeRequest}
      >
        인증하기
      </button>
      <button
        onClick={handleAuthCodeCheck}
        className={
          isTimerStarted === true ? "buttonConfirm" : "buttonConfirm notAllow"
        }
        disabled={isTimerStarted === false}
      >
        확 인
      </button>
      <span className="timer">{formatTimer(timer)}</span>
    </div>
  );
};

export default Register;
