import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Quote from "../components/core/About/Quote";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import foundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/About/Stats";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactForm from "../components/core/About/ContactFormSection";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div>
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between mt-[80px]">
      <div className="text-16px text-[#999DAA] font-semibold">About Us</div>
      {/* section 1 */}
      <section>
        <div>
          <header>
            <div className="text-center text-4xl font-semibold mt-[50px] text-richblack-5 lg:w-[809px] translate-x-[185px]">
              Driving Innovation in Online Education for a
              <HighlightText text={"Brighter Future"} />
            </div>
            <div className="mt-4 text-center text-lg font-bold text-richblack-300 lg:w-[912px] translate-x-[150px]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </div>
            <div className="flex flex-row justify-between mt-10 gap-x-4 mx-auto">
              <img src={aboutus1} alt="aboutus1" />
              <img src={aboutus2} alt="aboutus2" />
              <img src={aboutus3} alt="aboutus3" />
            </div>
          </header>
        </div>
      </section>

      {/* section 2 */}
      <section>
        <div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      <section>
        <div className="flex flex-col gap-y-14">
          {/* section 3.1 */}
          <div className="flex flex-row justify-between">
            <div className="text-left text-[16px] font-semibold mt-7 text-richblack-100 max-w-[45%]">
              <span className="font-bold text-[36px] text-transparent bg-clip-text bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                Our Founding Story
              </span>
              <p className="mt-4 font-bold text-richblack-300">
                <div>
                
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </div>
                <div>
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </div>
              </p>
            </div>
            <div className="m-auto padding-[32px] gap-[2px] translate-y-2 max-w-[45%]">
              <img src={foundingStory} alt="Founding Story" />
            </div>
          </div>
          {/* section 3.2 */}
          <div className="flex flex-row justify-between mb-[90px]">
            <div className="text-left text-[36px] font-semibold mt-7 text-richblack-100 max-w-[45%]">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#FF512F]  to-[#F09819]">
                 Our Vision
            </span>
              <p className="mt-4 text-[16px] font-bold text-richblack-300">
                <div>
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </div>
              </p>
            </div>
            <div className="text-left text-[36px] font-semibold mt-7 text-richblack-100 max-w-[45%]">
              <HighlightText text={"Our Mission"}/>
              <p className="mt-4 text-[16px] font-bold text-richblack-300">
                <div>
                  our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section>
      <Stats/>
      </section>

      {/* section 5 */}
      <section>
        <LearningGrid/>
      </section>

      {/* section 6 */}
      <section>
        <ContactForm/>
      </section>
    </div>
    {/* section 7 */}
    <section>
        <Footer/>
      </section>
    </div>
  );
};

export default About;
