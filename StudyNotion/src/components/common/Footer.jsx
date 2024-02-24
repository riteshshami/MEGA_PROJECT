import React from "react";
import FooterLogo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube, FaHeart } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";


const Footer = () => {

  return (
    <div className="bg-richblack-800">
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-richblack-5 justify-between gap-2">
        <div className="flex flex-row gap-14">
          {/* Left Section */}
        <div className="flex flex-row mt-20 h-fit w-[50%] gap-[65px]">
          <div className="flex flex-col gap-5">
            <img src={FooterLogo} alt="logo" className="w-[160px] h-[32px]" loading="lazy" />
            <p className="text-[16px] text-richblack-100 font-semibold">Company</p>
            <div className="text-[14px] text-richblack-400 flex flex-col gap-2">
              <div>About</div>
              <div>Careers</div>
              <div>Affiliates</div>
            </div>
            <div className="flex flex-row gap-5 text-richblack-400">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[16px] text-richblack-100 font-semibold">Resources</p>
            <div className="text-[14px] text-richblack-400 flex flex-col gap-2">
              <div>Articles</div>
              <div>Blog</div>
              <div>Chart Sheet</div>
              <div>Code challenges</div>
              <div>Docs</div>
              <div>Projects</div>
              <div>Videos</div>
              <div>Workspaces</div>
            </div>
            <br/>
            <p className="text-[16px] text-richblack-100 font-semibold">Support</p>
            <div className="text-[14px] text-richblack-400 flex flex-col gap-2">
              <div>Help Center</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[16px] text-richblack-100 font-semibold">Plans</p>
            <div className="text-[14px] text-richblack-400 flex flex-col gap-2">
              <div>Paid Memberships</div>
              <div>For students</div>
              <div>Business solutions</div>
            </div>
            <br/>
            <p className="text-[16px] text-richblack-100 font-semibold">Community</p>
            <div className="text-[14px] text-richblack-400 flex flex-col gap-2">
            <div>Forums</div>
            <div>Chapters</div>
            <div>Events</div>
            </div>
          </div>
        </div>
        <div className="border-l mt-20 py-3 border-richblack-700"></div>
        {/* Right Section */}
        <div className="flex flex-row mt-20 h-fit w-[50%] gap-[65px] justify-between">
          {FooterLink2.map((section) => (
          <div key={section.title} className="flex flex-col gap-5">
            <div className="text-[16px] text-richblack-100 font-semibold">
              {section.title}
            </div>
            <div className="text-[14px] text-richblack-400 flex flex-col gap-2">
              {section.links.map((link) => (
                <Link to={link.link} key={link.title}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
        </div>
        </div>
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700"></div>
        <div className="flex flex-row mb-5 mt-3 text-sm gap-[120px] justify-between">
          <div className="flex flex-row gap-[10px] text-richblack-400 mr-[625px]">
          <div>Privacy Policy</div>
          <div>Cookie Policy</div>
          <div>Terms</div>
          </div>
          <div className="flex flex-row gap-[8px] text-richblack-400 text-sm">
            Made with <FaHeart color="red"/> Codehelp @ 2023 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
