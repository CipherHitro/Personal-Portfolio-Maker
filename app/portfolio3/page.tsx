"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink, Instagram } from 'lucide-react';
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

const pro = [
  {
    title: 'Project One',
    description: 'A full-stack web application built with React and Node.js',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    title: 'Project Two',
    description: 'An AI-powered chatbot for customer service',
    tech: ['Python', 'TensorFlow', 'Flask'],
    link: '#'
  },
  {
    title: 'Project Three',
    description: 'E-commerce platform with real-time inventory management',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    link: '#'
  }
];

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const getSkillIconUrl = (skill) => {
    const normalizedSkill = skill.toLowerCase().replace(/\s+/g, '');
    return `https://cdn.simpleicons.org/${normalizedSkill}`;
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("portfolioData");

    // Parse JSON if data exists
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-800/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                &lt;/&gt; {data.brandTitle}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-gray-300 hover:text-white capitalize transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="mb-8 w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mx-auto">
              <Image
                src={data.profileImage || "/default-profile-image.jpg"}
                alt="Profile"
                width={250}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              {data.greeting}, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{data.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 mb-8">{data.role}</p>
            <div className="flex justify-center gap-4">
              {/* <a
                href={data.resumeUrl}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a> */}
              <button
                onClick={() => setShowPdfModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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

              <a
                href={`mailto:${data.email}`}
                className="px-6 py-3 border border-blue-600 hover:bg-blue-600/10 rounded-lg transition-colors"
              >
                Contact Me
              </a>
              {/* <button className="px-6 py-3 border border-blue-600 hover:bg-blue-600/10 rounded-lg transition-colors">
                Contact Me
              </button> */}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto text-justify">
              {data.about}
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {data.skills && data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <Image
                    src={getSkillIconUrl(skill)}
                    alt={skill}
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900 rounded-xl hover:transform hover:scale-105 transition-all"
                >
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className="text-gray-400 mb-2">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                  <p className="text-sm text-blue-500 mt-2">{edu.grade}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects && data.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                          </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    className="inline-flex items-center text-blue-500 hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Me</h2>
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col space-y-4">
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="h-6 w-6 mr-3" />
                  <span>{data.email}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 {data.name}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href={data.github} className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
              <a href={data.linkedin} className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={data.twitter} className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6" />
              </a>
              <a href={data.instagram} className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}