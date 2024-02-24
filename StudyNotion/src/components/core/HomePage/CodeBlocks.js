import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeColor,
  codeblock,
  blobColor1,
  blobColor2,
  blobColor3,
}) => {
  return (
    <div className={`flex ${position} justify-between my-20 items-start gap-20`}>
      {/* Section 1 */}
      <div className="w-[45%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.text}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.text}
          </CTAButton>
        </div>
      </div>
      {/* Section 2 */}
      <div className={`lg:w-[50%] ${position === "lg:flex-row" ? "translate-x-28" : "-translate-x-20"}`}>
        <div className=" h-fit flex flex-row text-10 w-[100%] py-4 lg:w-[500px] bg-richblack-5 bg-opacity-10 backdrop-blur-xl rounded drop-shadow-lg absolute z-50">
          <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
          >
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
        <div className={`bg-gradient-to-br from-[${blobColor1}] via-[${blobColor2}] to-[${blobColor3}] h-[150px] w-[150px] relative -z-50 `}></div>
      </div>
    </div>
  );
};

export default CodeBlocks;
