import React from "react";
import image from "../images/mid-show.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            In life, we often come across moments that test our patience and strength. 
            We face challenges that may seem impossible to overcome, but these experiences 
            shape who we are as we move forward. Each difficulty leaves its mark, 
            helping us build character.

            Sometimes, the obstacles feel repetitive, but they have a purpose: they push us to grow. 
            Each struggle reveals new strengths, gives us valuable lessons, and helps us build resilience. 
            When we overcome these hardships, we feel more confident and ready for the next challenge.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
