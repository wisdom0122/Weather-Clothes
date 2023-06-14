import Weather from "./Weather";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sample_logo_3.png";
import { isLoggedInState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post("https://todayclothes.site/api/auth/sign-out", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/");
      setIsLoggedIn(false); // Update login state in Recoil
      localStorage.setItem("isLoggedIn", "false");
      // Perform any additional logout actions (e.g., clearing local storage, redirecting, etc.)
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure
      setIsLoggedIn(false); // Update login state in Recoil
    }
  };

  return (
    <nav className="flex justify-around items-center py-4 px-6 font-bold navbar">
      <div>
        <Link to="/" className="text-2xl text-gray-800">
          <img className="logoImg" src={logo} alt="Logo"></img>
        </Link>
      </div>
      <ul className="flex gap-4">
        {isLoggedIn ? (
          <li>
            <Link
              to="/bookmark"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-bold text-2xl"
            >
              옷장
            </Link>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-bold text-2xl"
            >
              옷장
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <Link
              to="/mypage"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-2xl"
            >
              마이페이지
            </Link>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-2xl"
            >
              마이페이지
            </Link>
          </li>
        )}

        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-2xl"
            >
              로그아웃
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-2xl"
            >
              로그인
            </Link>
          </li>
        )}
      </ul>
      <ul className="flex gap-4">
        <li className="weatherBox">
          <Weather />
        </li>
      </ul>
      <style jsx>{`
        .weatherBox {
          margin-right: 100px;
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
