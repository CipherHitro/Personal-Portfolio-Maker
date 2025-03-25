import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, FileText, Link, Image } from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([{
    title: '',
    description: '',
    imageUrl: '',
    github: ''
  }]);

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", github: "", imageUrl: "" }]);
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  return (
    
  );
}
