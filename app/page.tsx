"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ProjectsSection from "@/components/ProjectsSection";

import { PlusCircle, MinusCircle, User, Briefcase, Image, FileText, Link, GraduationCap, Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function PortfolioForm() {
  const [skills, setSkills] = useState(['']);
  const [education, setEducation] = useState([{
    degree: '',
    institution: '',
    year: '',
    grade: ''
  }]);

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const addEducation = () => {
    setEducation([...education, {
      degree: '',
      institution: '',
      year: '',
      grade: ''
    }]);
  };

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-4">
              Create Your Portfolio
            </h1>
            <p className="text-muted-foreground text-lg">
              Fill in your details to generate a beautiful, professional portfolio website
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-12 bg-card rounded-2xl shadow-xl p-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold">Basic Information</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="greeting" className="text-sm font-medium">
                    Greeting Message
                  </Label>
                  <Input 
                    id="greeting" 
                    name="greeting" 
                    placeholder="e.g., Hi! Hello! Welcome!"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your full name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Job Role/Status
                    </div>
                  </Label>
                  <Input 
                    id="role" 
                    name="role" 
                    placeholder="e.g., Software Engineer, Student"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandTitle" className="text-sm font-medium">
                    Navbar Brand/Title
                  </Label>
                  <Input 
                    id="brandTitle" 
                    name="brandTitle" 
                    placeholder="e.g., John's Portfolio, JD"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileImage" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Profile Image URL
                    </div>
                  </Label>
                  <Input 
                    id="profileImage" 
                    name="profileImage" 
                    type="url" 
                    placeholder="https://your-image-url.com"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumeUrl" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Resume URL
                    </div>
                  </Label>
                  <Input 
                    id="resumeUrl" 
                    name="resumeUrl" 
                    type="url" 
                    placeholder="Link to your resume"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold">About</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="about" className="text-sm font-medium">
                  About You
                </Label>
                <Textarea 
                  id="about" 
                  name="about" 
                  placeholder="Tell us about yourself..."
                  className="min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required 
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Skills</h2>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addSkill}
                  className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      name={`skills[${index}]`}
                      placeholder="Enter a skill"
                      value={skill}
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index] = e.target.value;
                        setSkills(newSkills);
                      }}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    {skills.length > 1 && (
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => removeSkill(index)}
                        className="shrink-0 transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Education</h2>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addEducation}
                  className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="p-6 border rounded-xl bg-card/50 space-y-6 transition-all duration-200 hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Education #{index + 1}
                      </h3>
                      {education.length > 1 && (
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => removeEducation(index)}
                          className="transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <MinusCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`education[${index}].degree`} className="text-sm font-medium">
                          Degree/Certificate
                        </Label>
                        <Input
                          name={`education[${index}].degree`}
                          placeholder="e.g., B.Tech, HSC"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].degree = e.target.value;
                            setEducation(newEducation);
                          }}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`education[${index}].institution`} className="text-sm font-medium">
                          Institution
                        </Label>
                        <Input
                          name={`education[${index}].institution`}
                          placeholder="Institution name"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].institution = e.target.value;
                            setEducation(newEducation);
                          }}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`education[${index}].year`} className="text-sm font-medium">
                          Year
                        </Label>
                        <Input
                          name={`education[${index}].year`}
                          placeholder="Year of completion"
                          value={edu.year}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].year = e.target.value;
                            setEducation(newEducation);
                          }}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`education[${index}].grade`} className="text-sm font-medium">
                          Grade/Percentage
                        </Label>
                        <Input
                          name={`education[${index}].grade`}
                          placeholder="Grade or percentage"
                          value={edu.grade}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].grade = e.target.value;
                            setEducation(newEducation);
                          }}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="project">
              <ProjectsSection/>
            </div>
            {/* Social Links */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Link className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold">Social Links</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </div>
                  </Label>
                  <Input 
                    id="linkedin" 
                    name="linkedin" 
                    type="url" 
                    placeholder="Your LinkedIn profile URL"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </div>
                  </Label>
                  <Input 
                    id="github" 
                    name="github" 
                    type="url" 
                    placeholder="Your GitHub profile URL"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </div>
                  </Label>
                  <Input 
                    id="twitter" 
                    name="twitter" 
                    type="url" 
                    placeholder="Your Twitter profile URL"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </div>
                  </Label>
                  <Input 
                    id="instagram" 
                    name="instagram" 
                    type="url" 
                    placeholder="Your instagram profile URL"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full text-lg h-12 transition-all duration-200">
              Create Portfolio
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}