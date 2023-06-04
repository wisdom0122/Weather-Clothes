import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../recoil/atom";

function Auth() {

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const navigate = useNavigate();
  
    //네이버로그인
    useEffect(() => {
      // 인가코드 추출
      const naverCode = new URL(window.location.href).searchParams.get("code");
      console.log("naverCode",naverCode)
      const naverState = new URL(window.location.href).searchParams.get("state");
      console.log("naverState",naverState)
      
      if (naverCode && naverState) {
        const clientId = process.env.REACT_APP_NAVER_CLIENT_ID; // 네이버 클라이언트 ID
        const clientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET; // 네이버 클라이언트 시크릿
      
            axios.post(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${naverCode}&state=${naverState}`, {},
              { headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
              .then(response => {
                console.log(response);
                const accessToken = response.data.access_token;
                console.log("NaverAccessToken", accessToken);
                // 쿠키 설정
                const cookies = response.headers["set-cookie"];
                if (cookies) {
                  cookies.forEach((cookie) => {
                    document.cookie = cookie;
                  });
                }
                setIsLoggedIn(true); // 로그인 상태 업데이트

                navigate("/mypage");
                        
      
              })
              .catch(error => {
                // 에러 처리 로직을 작성합니다.
              });
          }
        }, []);
  

  //카카오 로그인
    useEffect(() => {
     
      const code = new URL(window.location.href).searchParams.get("code"); // 인가코드 추출
      const grantType = "authorization_code";
      const REST_API_KEY = process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY;
      const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;

      axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {},
          { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
      )
      .then((res) => {
          console.log(res);
          const { access_token } = res.data;
          axios.post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                  headers: {
                      Authorization: `Bearer ${access_token}`,
                      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                  }
              }
          )
          .then((res) => {
            console.log("kakaoAccessToken", access_token);
            // 쿠키 설정
            const cookies = res.headers["set-cookie"];
            if (cookies) {
              cookies.forEach((cookie) => {
                document.cookie = cookie;
              });
            }
            setIsLoggedIn(true); // 로그인 상태 업데이트

            navigate("/mypage");
          })
      })
      .catch((Error) => {
          console.log(Error)
      })
  }, [])
    

  return (
    <div></div>
  )
}

export default Auth;
