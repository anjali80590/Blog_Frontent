import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

import CookingImg from "../../images/CookingImg.png";
import TechImg from "../../images/TechImg.png";
import FamilyImg from "../../images/FamilyImg.png";
import WorldImg from "../../images/World.png";

const backgrounds = [
  {
    title: "Cooking Blogs",
    description:
      "Explore a world of flavors and techniques with our in-depth cooking guides and recipes. Whether you're a beginner or a seasoned chef, discover new dishes and refine your culinary skills.",
    imageUrl: CookingImg,
    bgColor: "#bc382e",
  },
  {
    title: "Tech Trends",
    description:
      "Stay ahead of the curve with the latest insights and updates from the tech world. From groundbreaking innovations to in-depth analyses, we've got you covered on all things technology.",
    imageUrl: TechImg,
    bgColor: "#4583aa",
  },
  {
    title: "Family Chronicles",
    description:
      "Capture and cherish your family's adventures and milestones. Our blog is a heartfelt space where memories are preserved, stories are told, and family bonds are celebrated.",
    imageUrl: FamilyImg,
    bgColor: "#388d80",
  },
];

const HomePage = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [bgColor, setBgColor] = useState(backgrounds[0].bgColor);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newBackground = (currentBackground + 1) % backgrounds.length;
      setBgColor(backgrounds[newBackground].bgColor);
      setCurrentBackground(newBackground);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentBackground]);

  const handleCreateNewBlog = () => {
    navigate("/auth");
  };

  const { title, description, imageUrl } = backgrounds[currentBackground];

  return (
    <div>
      <Header style={{ backgroundColor: bgColor }} />
      <div className="home-container" style={{ backgroundColor: bgColor }}>
        <div className="content">
          <h1>{title}</h1>
          <p>{description}</p>
          <button
            className="create-blog-button"
            onClick={handleCreateNewBlog}
            style={{
              backgroundColor: "#ff8000",
              border: "none",
              padding: "12px 20px",
            }}
          >
            Create New Blog
          </button>
        </div>
        <div
          className="background-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>

      <div className="audience-section">
        <div className="audience-text">
          <h2>Engage with the Blogging Community</h2>
          <p className="small-text">
            Explore and interact with a vibrant community of bloggers. Our
            platform not only allows you to create, update, and delete your own
            blog posts but also lets you discover and engage with content from
            other users. Dive into diverse perspectives and expand your horizons
            by connecting with others' blogs. Our integrated analytics provide
            insights into which of your posts are most popular and where your
            audience is coming from.
          </p>
        </div>
        <div className="audience-image">
          <img src={WorldImg} alt="World Map" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
