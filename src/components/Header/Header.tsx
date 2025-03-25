import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import './Header.css';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#hero" className="logo">AP</a>

        <div className="header-right">
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
              <li><a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a></li>
              <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>

          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
