import React from "react";
import { Link } from "react-router-dom";
import InterestCard from "./InterestCard";
import { MdOutlineScience } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { IoLanguage } from "react-icons/io5";
import { BiPaint } from "react-icons/bi";
import { SiLibreofficemath } from "react-icons/si";
import { MdHealthAndSafety } from "react-icons/md";
import { IoTelescopeSharp } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa6";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="grid grid-cols-2 justify-center gap-12  max-lg:flex max-lg:flex-col max-lg:gap-4">
      <div className="text-white flex flex-col gap-4 max-lg:gap-2 ">
        <h1 className="text-6xl max-lg:text-5xl ">
          Unleash Your Inner Wizard of Wisdom
        </h1>
        <p className="text-lg mb-6 mt-3 text-white max-lg:text-gray-200 max-lg:text-xl">
          Challenge yourself with fun quizzes on various topics. Test your
          knowledge, compete with others, and discover your strengths!
        </p>
        <Button className="rounded-xl p-4  bg-blue-600 inline-flex self-start max-lg:hidden">
          <Link to="/login" className="">
            Start Now
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-white text-lg">What topic are you interested in?</p>
        <div className="grid grid-cols-4 gap-4 ">
          <InterestCard subjectName="Science" subjectIcon={MdOutlineScience} />
          <InterestCard subjectName="Geography" subjectIcon={GiWorld} />
          <InterestCard subjectName="Language" subjectIcon={IoLanguage} />
          <InterestCard subjectName="Art" subjectIcon={BiPaint} />
          <InterestCard subjectName="Math" subjectIcon={SiLibreofficemath} />
          <InterestCard subjectName="Health" subjectIcon={MdHealthAndSafety} />
          <InterestCard
            subjectName="Astronomy"
            subjectIcon={IoTelescopeSharp}
          />
          <InterestCard subjectName="Weather" subjectIcon={FaCloudSun} />
        </div>
      </div>
      <Button className="rounded-xl p-4  bg-blue-600 inline-flex self-start lg:hidden">
        <Link to="/login" className="">
          Start Now
        </Link>
      </Button>
    </div>
  );
};

export default Hero;
