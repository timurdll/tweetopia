"use client";
import Feed from "@components/Feed";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  const upperVariants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center"> Interesting Thoughts</span>
      </h1>
      <p className="desc text-center">
        Tweetopia is an open-source Twitter clone to discover, create and share
        creative tweets
      </p>

      <Feed />
      <motion.div
        variants={upperVariants}
        initial="hidden"
        animate={goUp ? "visible" : "hidden"}
        onClick={scrollToTop}
        className={`fixed text-2xl text-white bg-blue-400 rounded border-white w-16 h-16 bottom-20 right-20 z-20 items-center justify-center p-8 cursor-pointer flex`}
      >
        ^
      </motion.div>
    </section>
  );
};

export default Home;
