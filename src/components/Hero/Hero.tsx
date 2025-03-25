import React, { useState, useEffect } from 'react';
import './Hero.css';



const Hero: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const handleClick = (element: string) => {
    const experienceSection = document.getElementById(element);
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch('/src/data/skills.json');
      const data = await response.json();
      setSkills(data.skills);
    };
    fetchSkills();
  }
  , []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Anant Prakash</h1>
          <h2 className="hero-title">Software Developer</h2>
          <p className="hero-bio">
            I love building scalable, efficient systems—whether it’s containerizing DB2,
            orchestrating Kubernetes deployments, or fine-tuning a Flask backend.
            I’m always looking for ways to make tech work smarter, not harder.
            <br />
            Let’s connect—whether it’s about tech, travel, or just good coffee.
          </p>

          {/* Skills tags */}
          <div className="hero-skills">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>

          <div className="hero-cta">
            <button onClick={() => handleClick('projects')} className="cta-button primary">View My Work</button>
            <button onClick={() => handleClick('contact')} className="cta-button secondary">Contact Me</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-image-container">
            <img
              src="/src/assets/images/profile.jpg"
              alt="Anant Prakash"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('fallback-profile');
                }
              }}
            />
            <div className="profile-fallback">🦉</div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={() => handleClick('experience')}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div>
          <span className="scroll-arrow">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
