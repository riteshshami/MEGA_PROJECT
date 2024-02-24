import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-richblue-75 via-blue-75 to-caribbeangreen-75">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
