import React from "react";

import "./Landing.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-part">
        <h1 className="hero-headline">Share your story with the world</h1>
        <p className="hero-subheadline">
          Join BlogIt to express yourself, connect with others, and discover
          amazing stories from writers around the globe.
        </p>
        <div className="hero-buttons">
          <button className="cta-button primary-button">Start Writing</button>
          <button className="cta-button secondary-button">
            Explore Stories
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="landing-container">
      <Hero />
    </div>
  );
}
