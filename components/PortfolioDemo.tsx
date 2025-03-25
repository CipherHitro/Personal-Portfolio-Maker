import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";

export default function PortfolioPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const userData = {
    brandTitle: "John Doe Portfolio",
    greeting: "Hello!",
    name: "John Doe",
    role: "Full Stack Developer",
    profileImage: "https://via.placeholder.com/150",
    about: "I am a passionate developer with experience in building web applications.",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    education: [
      { degree: "B.Sc. Computer Science", institution: "XYZ University", year: "2022" },
      { degree: "M.Sc. Software Engineering", institution: "ABC Institute", year: "2024" }
    ],
    projects: [
      { title: "Portfolio Website", description: "A personal portfolio showcasing my skills and projects.", github: "https://github.com/johndoe/portfolio" },
      { title: "E-commerce App", description: "An online store built with React and Node.js.", github: "https://github.com/johndoe/ecommerce" }
    ],
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe"
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-800 shadow-lg p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{userData.brandTitle}</h1>
          <button className="md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul className={`md:flex gap-6 hidden`}>
            {["Home", "About", "Skills", "Education", "Projects", "Resume", "Contact"].map((item) => (
              <li key={item}>
                <ScrollLink to={item.toLowerCase()} smooth duration={500} className="cursor-pointer hover:text-primary">{item}</ScrollLink>
              </li>
            ))}
          </ul>
        </div>
        {isNavOpen && (
          <ul className="md:hidden flex flex-col items-center bg-gray-800 py-4 gap-4">
            {['Home', 'About', 'Skills', 'Education', 'Projects', 'Resume', 'Contact'].map((item) => (
              <li key={item}>
                <ScrollLink to={item.toLowerCase()} smooth duration={500} className="cursor-pointer hover:text-primary" onClick={() => setIsNavOpen(false)}>{item}</ScrollLink>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-20">
        {/* Hero Section */}
        <section id="home" className="text-center py-16">
          <h2 className="text-3xl font-bold">{userData.greeting}, I'm {userData.name}</h2>
          <p className="text-lg text-gray-400">{userData.role}</p>
          <img src={userData.profileImage} alt="Profile" className="w-40 h-40 mx-auto rounded-full mt-6 shadow-lg" />
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16">
          <h2 className="text-2xl font-semibold border-b pb-2">About Me</h2>
          <p className="mt-4 text-gray-400">{userData.about}</p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <h2 className="text-2xl font-semibold border-b pb-2">Skills</h2>
          <div className="flex flex-wrap gap-4 mt-6">
            {userData.skills.map((skill, index) => (
              <div key={index} className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
                <img src={`/icons/${skill.toLowerCase()}.png`} alt={skill} className="w-6 h-6 mr-2" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16">
          <h2 className="text-2xl font-semibold border-b pb-2">Education</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {userData.education.map((edu, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-gray-400">{edu.institution} ({edu.year})</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-2xl font-semibold border-b pb-2">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {userData.projects.map((project, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <a href={project.github} target="_blank" className="text-primary mt-2 block">GitHub Link</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center mt-12">
        <p className="text-gray-400">&copy; 2025 {userData.name}. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href={userData.linkedin} target="_blank"><Linkedin size={24} /></a>
          <a href={userData.github} target="_blank"><Github size={24} /></a>
          <a href={userData.twitter} target="_blank"><Twitter size={24} /></a>
        </div>
      </footer>
    </div>
  );
}
