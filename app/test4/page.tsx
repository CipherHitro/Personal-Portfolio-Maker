"use client";
import { useState, useEffect } from "react";

interface PortfolioData {
    greeting: string;
    name: string;
    role: string;
    brandTitle: string;
    profileImage?: string;
    about: string;
    linkedin:string;
    github:string;
    instagram:string;
    twitter:string;
    resumeUrl:string;
    education: { degree: string; institution: string; year: string; grade: string; }[];
    projects: { title: string; description: string; github: string; image:string;}[];
    skills: string[];
}


const PortfolioDisplay = () => {
    const [data, setData] = useState<PortfolioData | null>(null);

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

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Header Section */}
            <h1 className="text-3xl font-bold">{data.greeting}, I'm {data.name}</h1>
            <h2 className="text-xl text-gray-600">{data.role}</h2>
            <h3 className="text-lg font-semibold mt-2">{data.brandTitle}</h3>

            {/* Profile Image */}
            {data.profileImage && (
                <img src={data.profileImage} alt="Profile" className="w-32 h-32 rounded-full mt-4" />
            )}

            {/* About Section */}
            <p className="mt-4">{data.about}</p>

            {/* Education Section */}
            <h2 className="text-2xl font-semibold mt-6">Education</h2>
            {data.education && data.education.map((edu, index) => (
                <div key={index} className="border p-3 rounded-md mt-2">
                    <p><strong>Degree:</strong> {edu.degree}</p>
                    <p><strong>Institution:</strong> {edu.institution}</p>
                    <p><strong>Year:</strong> {edu.year}</p>
                    <p><strong>Grade:</strong> {edu.grade}</p>
                </div>
            ))}

            {/* Skills Section */}
            <h2 className="text-2xl font-semibold mt-6">Skills</h2>
            <ul className="list-disc pl-5">
                {data.skills && data.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>

            {/* Projects Section */}
            <h2 className="text-2xl font-semibold mt-6">Projects</h2>
            {data.projects && data.projects.map((project, index) => (
                <div key={index} className="border p-3 rounded-md mt-2">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p>{project.description}</p>
                    {project.image && (
                        <img src={project.image} alt="Project" className="w-full h-48 object-cover mt-2" />
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                        GitHub Repo
                    </a>
                </div>
            ))}

            {/* Social Media Links */}
            <h2 className="text-2xl font-semibold mt-6">Connect With Me</h2>
            <ul>
                <li><a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href={data.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href={data.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>

            {/* Resume */}
            {data.resumeUrl && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">Resume</h2>
                    <img src={data.resumeUrl} alt="Resume" className="w-full h-auto mt-2" />
                </div>
            )}
        </div>
    );
};

export default PortfolioDisplay;
