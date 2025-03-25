"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Instagram, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface PortfolioData {
  greeting: string;
  name: string;
  role: string;
  brandTitle: string;
  profileImage?: string;
  email:string;
  about: string;
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
  resumeUrl: string;
  education: { degree: string; institution: string; year: string; grade: string; }[];
  projects: { title: string; description: string; github: string; image: string; technologies:string[];}[];
  skills: string[];
}

// This would be replaced with actual form data
const defaultData: PortfolioData = {
  greeting: "Hello, World!",
  name: "Rohit Rathod",
  role: "Full Stack Developer",
  brandTitle: "My Portfolio",
  profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  email: "rohit@example.com",
  about: "I'm a passionate developer who loves creating beautiful and functional web applications.",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  resumeUrl: "#",
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2022-2024",
      grade: "3.9 GPA"
    }
  ],
  projects: [], // Empty initially, can be updated later
  skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"]
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [data, setData] = useState<PortfolioData>(defaultData); 
  const [showPdfModal, setShowPdfModal] = useState(false);


  useEffect(() => {
    // Load data from localStorage if available
    const storedData = localStorage.getItem("portfolioData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData((prev) => ({
          ...prev,
          ...parsedData
        }));
      } catch (error) {
        console.error("Error parsing portfolio data from localStorage", error);
      }
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || '';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white">
      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-full p-2 z-50">
        <div className="hidden md:flex items-center space-x-1">
          {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === item 
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/20'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 px-4 py-2 text-white"
          >
            <span>Menu</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden">
              {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full px-6 py-3 text-left transition-colors ${
                    activeSection === item
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-2xl opacity-50" />
                <Image
                  src={data.profileImage}
                  alt={data.name}
                  width={200}
                  height={200}
                  className="w-full h-full border-4 border-white/20 object-cover"
                />
              </div>  */}

             <div className="mb-8 mt- w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 mx-auto">
                <Image
                  src={data.profileImage || "/default-profile-image.jpg"}
                  alt="Profile"
                  width={250}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold mb-6">
                {data.greeting.split(' ').map((word, i) => (
                  <span key={i} className="inline-block animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-2xl sm:text-3xl text-indigo-200 mb-8">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{data.name}</span>,
                <br className="sm:hidden" /> {data.role}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* <a
                  href={data.resumeUrl}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full hover:opacity-90 transition-opacity"
                >
                  Download Resume
                </a>  */}
                <button
                  onClick={() => setShowPdfModal(true)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full hover:opacity-90 transition-opacity"
                >
                  View Resume
                </button>
                  {/* Used Iframe for PDF display because -- Modern browsers block direct navigation to data URLs in the top frame */}
                {showPdfModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[90vh]">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-black">Resume</h3>
                        <button 
                          onClick={() => setShowPdfModal(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                      <iframe 
                        src={data.resumeUrl}
                        className="w-full h-full border-0"
                        title="Resume PDF Viewer"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border border-indigo-400 rounded-full hover:bg-white/10 transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
            <p className="text-xl leading-relaxed text-indigo-100 text-justify">
              {data.about}
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl font-bold text-center mb-16">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {data.skills.map((skill, index) => (
                <div
                  key={skill}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{skill.charAt(0)}</span>
                    </div>
                    <h3 className="font-medium">{skill}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl font-bold text-center mb-16">Education</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[300px] max-w-[400px] p-6 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all hover:transform hover:scale-105"
                >
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-indigo-200 mb-2">{edu.institution}</p>
                    <p className="text-indigo-300">{edu.year}</p>
                    <p className="text-indigo-400 mt-2">{edu.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects && data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-indigo-200 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                     {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.github}
                      className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
            <div className="flex justify-center space-x-8">
              {[
                { icon: Github, link: data.github },
                { icon: Linkedin, link: data.linkedin },
                { icon: Twitter, link: data.twitter },
                { icon: Instagram, link: data.instagram }
              ].map(({ icon: Icon, link }) => (
                <a
                  key={link}
                  href={link}
                  className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-indigo-300 bg-black/20">
          <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}