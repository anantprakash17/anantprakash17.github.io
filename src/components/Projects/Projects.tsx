import { useState, useEffect } from 'react';
import './Projects.css';

interface ProjectLink {
  live?: string;
  github?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: ProjectLink;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'featured'>('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // First try to fetch the projects JSON file
        const response = await fetch('https://raw.githubusercontent.com/anantprakash17/anantprakash17.github.io/refs/heads/main/src/data/projects.json');

        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }

        const data = await response.json();
        setProjects(data);
        setVisibleProjects(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);

        // Fallback to hardcoded projects if fetch fails
        try {
          // Import the JSON directly for production builds
          import('../../data/projects.json')
            .then(module => {
              const data = module.default;
              setProjects(data);
              setVisibleProjects(data);
              setIsLoading(false);
            })
            .catch(importErr => {
              setError('Failed to load projects data. Please try again later.');
              setIsLoading(false);
              console.error('Error importing projects:', importErr);
            });
        } catch (importErr) {
          setError('Failed to load projects data. Please try again later.');
          setIsLoading(false);
          console.error('Error importing projects:', importErr);
        }
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(project => project.featured));
    }
  }, [filter, projects]);

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        <div className="projects-filter">
        <button
            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            Featured Projects
          </button>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('show-fallback');
                      }
                    }}
                  />
                  <div className="project-fallback">
                    <span className="project-fallback-emoji">📂</span>
                  </div>
                </div>
                {project.featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-badge" key={index}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link live"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
