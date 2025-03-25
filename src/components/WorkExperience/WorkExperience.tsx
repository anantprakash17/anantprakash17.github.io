import { useState, useEffect } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './WorkExperience.css';

interface Experience {
  id: number;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const WorkExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the scroll reveal hook
  const revealRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    staggerDelay: 150
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/anantprakash17/anantprakash17.github.io/refs/heads/main/src/data/work-experience.json');
        if (!response.ok) {
          throw new Error('Failed to fetch experience data');
        }
        const data = await response.json();

        // Sort experiences by date (most recent first)
        const sortedExperiences = [...data].sort((a, b) => {
          // Convert date strings to Date objects for comparison
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateB.getTime() - dateA.getTime(); // Descending order
        });

        setExperiences(sortedExperiences);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load experience data. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching experiences:', err);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>

        <div className="experience-timeline" ref={revealRef}>
          {experiences.map((exp, index) => (
            <div
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'} reveal`}
              key={exp.id}
            >
              <div className="experience-date-location">
                <div className="experience-date">{exp.startDate} - {exp.endDate}</div>
                <div className="experience-location">{exp.location}</div>
              </div>
              <div className="experience-content">
                <h3 className="experience-title">
                  {exp.title} <span className="experience-company">@ {exp.company}</span>
                </h3>
                <p className="experience-description">{exp.description}</p>

                <ul className="experience-achievements">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>

                <div className="experience-tech">
                  {exp.technologies.map((tech, index) => (
                    <span className="tech-badge" key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
