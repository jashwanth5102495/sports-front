import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CareerTimeline from './components/CareerTimeline';
import Statistics from './components/Statistics';
import Achievements from './components/Achievements';
import Events from './components/Events';
import Videos from './components/Videos';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Gallery from './components/Gallery';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper component to handle scrolling to hash links when navigating to /
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return null;
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <CareerTimeline />
      <Statistics />
      <Achievements />
      <Events />
      {/* Sponsors section removed as requested */}
      <Contact />
      <Footer />
    </>
  );
}

function VideosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-zinc-900">
        <Videos />
      </div>
      <Footer />
    </>
  );
}

function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-zinc-900">
        <Gallery />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen bg-zinc-950 font-sans selection:bg-accent selection:text-zinc-950 text-zinc-50 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
