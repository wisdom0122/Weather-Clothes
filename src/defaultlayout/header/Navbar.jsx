import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sample_logo_3.png";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center py-4 px-6 font-bold navbar">
      <div>
        <Link to="/" className="text-2xl text-gray-800">
          <img className="logoImg" src={logo} alt="Logo"></img>
        </Link>
      </div>
      <ul className="flex gap-4">
        <li>
          <Link
            to="/bookmark"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-bold text-2xl"
          >
            옷장
          </Link>
        </li>
        <li>
          <Link
            to="/mypage"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-2xl"
          >
            마이페이지
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-2xl"
          >
            로그인
          </Link>
        </li>
      </ul>
      <ul className="flex gap-4">
        <li className="weatherBox">{/* 날씨 컴포넌트  */} 날씨 </li>
      </ul>
      <style jsx>{`
        .weatherBox {
          width: 309px;
          height: 47px;
          border: 1px solid black;
          margin-right: 150px;
        }
        .logoImg {
          width: 230px;
          height: 80.16px;
          margin-left: 150px;
        }
        .navbar {
          margin-bottom: 30px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
