import React from "react";
import Footer from "../components/common/Footer";
import ContactUs from "../components/common/ContactUs";
import ReviewSlider from "../components/common/ReviewSlider";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section + FORM */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]">
          <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
            {contactDetails.map((ele, i) => {
              let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
              return (
                <div
                  className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
                  key={i}
                >
                  <div className="flex flex-row items-center gap-3">
                    <Icon size={25} />
                    <h1 className="text-lg font-semibold text-richblack-5">
                      {ele?.heading}
                    </h1>
                  </div>
                  <p className="font-medium">{ele?.description}</p>
                  <p className="font-semibold">{ele?.details}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:w-[60%]">
          <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
              Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>
            <p className="">
              Tell us more about yourself and what you&apos;re got in mind.
            </p>

            <div className="mt-7">
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
