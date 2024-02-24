import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/* Section1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200ms hover:scale-95 w-fit">
            <div className="group flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7 text-richblack-5">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex fle-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-3xl">
          <video muted loop autoPlay src={Banner} type="video/mp4" loading='lazy'></video>
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighlightText text={"coding potential"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              active: true,
              linkto: "/signup",
              text: "Try it yourself",
            }}
            ctabtn2={{
              active: false,
              linkto: "/login",
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n<head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</\na><ahref="two/">Two</\na><ahref="three/">Three</a></nav>`}
            codeColor={"text-white"}
            blobColor1= {"#8A2BE2"}
            blobColor2= {"#FFA500"}
            blobColor3= {"#F8F8FF"}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              active: true,
              linkto: "/signup",
              text: "Continue Lesson",
            }}
            ctabtn2={{
              active: false,
              linkto: "/login",
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n<head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</\na><ahref="two/">Two</\na><ahref="three/">Three</a></nav>`}
            codeColor={"text-white"}
            blobColor1= {"#1FA2FF"}
            blobColor2= {"#12D8FA"}
            blobColor3= {"#A6FFCB"}
          />
        </div>
        
        <ExploreMore/>
      </div>

      {/* Section2 */}
      <div className="bg-[#f9f9f9] text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="mt-[12rem]">
              <div className="flex flex-row gap-7 text-white">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="flex items-center gap-3 ">
                    Explore Full Catalog
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton active={false} linkto={"/signup"}>
                  <div>Learn More</div>
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
          <div className="text-4xl font-semibold w-[45%]">
          Get the skills you need for a <HighlightText text={"Job that is in demand"}/>
          </div>
          <div className="flex flex-col gap-10 w-[40%] items-start">
            <p className="text-[16px]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            <CTAButton active={true} linkto={"/signup"}><div>Learn More</div></CTAButton>
          </div>
          </div>

          <TimelineSection/>

          <LearningLanguageSection/>
        </div>

      </div>

      {/* Section3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection/>

        <h2 className="text-center text-4xl font-semibold mt-10">Reviews from other learners</h2>
        {/* Review section here */}
        <ReviewSlider/>
      </div>

      {/* Footer */}
      <Footer/>

    </div>
  );
};

export default Home;
