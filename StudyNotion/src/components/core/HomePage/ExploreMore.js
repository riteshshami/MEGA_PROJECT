import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skilled Paths",
  "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="mt-10">
      <div className="text-4xl font-semibold text-center">
        Unlock the <HighlightText text={"Power of Code"}></HighlightText>
      </div>
      <p className="text-center text-richblack-300 text-sm mt-3">
        Learn to Build Anything You Can Imagine
      </p>
      {/* <div className="flex flex-row rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-100 px-1 py-1">
        {tabName.map((element, index) => {
          return (
            <button
              key={index}
              className={`flex flex-row text-[16px] items-center gap-2 ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
              onClick={() => setMyCards(element)}
            >
              {element}
            </button>
          );
        })}
      </div> */}
      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* course card */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {
            courses.map((element, index) => {
                return(
                    <CourseCard
                        key={index}
                        cardData={element}
                        currentCard = {currentCard}
                        setCurrentCard = {setCurrentCard}
                    />
                )
            })
        }
      </div>

    </div>
  );
};

export default ExploreMore;
