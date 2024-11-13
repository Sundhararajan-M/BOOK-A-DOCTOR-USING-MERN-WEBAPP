import React from "react";
import image from "../images/front-top.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, <br />
          Our Responsibility
        </h1>
        <p>
        In a world filled with complexity, the challenges we face can often seem overwhelming. 
        Yet, even amid tenacious obstacles, we find resilience and strength to overcome them. 
        Struggles may burden us, just as hardships test our resolve, but it’s in these 
        moments we uncover our true potential and resilience.


        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
