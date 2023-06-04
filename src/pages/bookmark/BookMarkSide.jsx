import React from "react";
import styled from "styled-components";

const BookMarkSide = ({ sideTitle, onClick }) => {
  const handleClick = () => {
    onClick(sideTitle);
  };

  return (
    <div className="titleHover" onClick={handleClick}>
      <div>{sideTitle}</div>
    </div>
  );
};

export default BookMarkSide;
