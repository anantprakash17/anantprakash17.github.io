import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <WorkExperience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
