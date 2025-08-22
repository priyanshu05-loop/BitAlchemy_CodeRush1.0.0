import { Routes, Route } from 'react-router-dom';
import Feature from './components/Feature'
import Hero from './components/hero'
import Interface from './components/Interface'
import Privacy from './components/Privacy'
import Chatbot from './components/Chatbot';
import About from './components/About';
import Contact from './components/Contact';
import Research from './components/Research';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import MoodDashboard from './components/MoodDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <Hero />
          <Feature />
          <Interface />
          <Privacy />
        </div>
      } />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/mood" element={<MoodDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/research" element={<Research />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  )
}

export default App