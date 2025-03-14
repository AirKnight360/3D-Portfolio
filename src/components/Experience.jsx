import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useEffect, useState } from "react";

import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant, fade } from "../utils/motion";

const ExperienceLinks = ({ experience, onClick, isActive, isMobile }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center`}
    >
      {isActive && !isMobile && (
        <motion.div
          layoutId="tag"
          className="absolute left-0 top-0 w-4 h-[70%] bg-tertiary my-6 sm:block"
        ></motion.div>
      )}
      <h3
        className={`text-xl lg:text-2xl xl:text-3xl font-bold sm:pl-8 text-quaternary duration-300 ${
          isActive ? "opacity-100" : "opacity-50"
        }`}
      >
        {experience.title}
      </h3>
      <p
        className={`text-md lg:text-lg xl:text-2xl sm:font-medium pt-2 sm:pl-8 text-white duration-300 ${
          isActive ? "opacity-100" : "opacity-50"
        }`}
      >
        {experience.company_name} | {experience.date}
      </p>
    </motion.div>
  );
};

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div
      initial={fade.initial}
      animate={fade.animate}
      exit={fade.exit}
      className="mt-5"
    >
      <ul className="max-w-7xl list-none space-y-8 border-4 lg:border-8 rounded-xl lg:rounded-3xl p-6">
        {experience.details.map((detail, index) => (
          <li
            key={`experience-detail-${index}`}
            className="text-slate-500 font-semibold text-[10px] xs:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[28px] lg:leading-[30px]"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
        ))}
      </ul>
    </motion.div>
  );
};

const Experience = () => {
  const [selectedJob, setSelectedJob] = useState(experiences[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sm:my-20">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionText} text-center`}>Experience</h2>
      </motion.div>

      <div className="relative mt-10 md:mt-20 md:p-20 flex flex-col items-center sm:flex-row sm:items-start">
        <div className="flex flex-col z-10 sm:w-full">
          {experiences.map((experience, index) => (
            <ExperienceLinks
              key={`experience-${index}`}
              experience={experience}
              onClick={() => setSelectedJob(experience)}
              isActive={selectedJob === experience}
              isMobile={isMobile}
            />
          ))}
        </div>

        <div className="flex justify-end z-10 sm:block">
          <AnimatePresence mode="wait">
            {experiences.map(
              (exp, i) =>
                selectedJob === exp && (
                  <ExperienceCard key={i} experience={exp} />
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "portfolio");
