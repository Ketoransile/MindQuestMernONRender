import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-screen bg-cover bg-center px-36 pt-10 flex flex-col gap-56">
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
