"use client";
import { useState, useEffect } from "react";

const PortfolioDisplay = () => {
    const [data, setData] = useState<any>(null); // Temporarily use `any` for debugging

    useEffect(() => {
        const storedData = localStorage.getItem("portfolioData");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                console.log("Retrieved Data:", parsedData); // Log data for debugging
                setData(parsedData);
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
            }
        }
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem("portfolioData");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
    
                // Ensure skills, education, and projects are arrays
                parsedData.skills = parsedData.skills || [];
                parsedData.education = parsedData.education || [];
                parsedData.projects = parsedData.projects || [];
    
                setData(parsedData);
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
            }
        }
    }, []);
    

    if (!data) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">{data?.greeting}, I'm {data?.name}</h1>
            <h2 className="text-xl text-gray-600">{data?.role}</h2>
            <h3 className="text-lg font-semibold mt-2">{data?.brandTitle}</h3>

            {/* Profile Image */}
            {data?.profileImage && (
                <img src={data.profileImage} alt="Profile" className="w-32 h-32 rounded-full mt-4" />
            )}

            {/* About Section */}
            <p className="mt-4">{data?.about}</p>

            {/* Debugging Output */}
            <pre className="bg-gray-200 p-2 mt-4 text-sm">
                {JSON.stringify(data, null, 2)}
                {/* {JSON.stringify(data.skills, null,2)} */}
            </pre>

            {/* Skills Section */}
            <h2 className="text-2xl font-semibold mt-6">Skills</h2>
            {Array.isArray(data?.skills) && data.skills.length > 0 ? (
                <ul className="list-disc pl-5">
                    {data.skills.map((skill: string, index: number) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            ) : (
                <p>No skills found</p>
            )}

            {/* Education Section */}
            <h2 className="text-2xl font-semibold mt-6">Education</h2>
            {Array.isArray(data?.education) && data.education.length > 0 ? (
                <ul className="list-disc pl-5">
                    {data.education.map((edu: any, index: number) => (
                        <li key={index}>
                            {edu.degree} - {edu.institution} ({edu.year})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No education details found</p>
            )}

            {/* Projects Section */}
            <h2 className="text-2xl font-semibold mt-6">Projects</h2>
            {Array.isArray(data?.projects) && data.projects.length > 0 ? (
                data.projects.map((project: any, index: number) => (
                    <div key={index} className="border p-4 rounded mt-2">
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        <p>{project.description}</p>
                        {project.github && (
                            <a href={project.github} target="_blank" className="text-blue-500">
                                GitHub Repo
                            </a>
                        )}
                    </div>
                ))
            ) : (
                <p>No projects found</p>
            )}
        </div>
    );
};

export default PortfolioDisplay;
