import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, FileText, Link, Image } from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([
    { title: "", description: "", github: "", image: "" },
  ]);

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", github: "", image: "" }]);
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="p-6 border rounded-xl bg-card/50 space-y-6 transition-all duration-200 hover:shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Project #{index + 1}
              </h3>
              {projects.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeProject(index)}
                  className="transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <MinusCircle className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`projects[${index}].title`} className="text-sm font-medium">
                  Project Title
                </Label>
                <Input
                  name={`projects[${index}].title`}
                  placeholder="Project name"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].title = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`projects[${index}].github`} className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    GitHub Link
                  </div>
                </Label>
                <Input
                  name={`projects[${index}].github`}
                  type="url"
                  placeholder="GitHub repository URL"
                  value={project.github}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].github = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor={`projects[${index}].description`} className="text-sm font-medium">
                  Project Description
                </Label>
                <Textarea
                  name={`projects[${index}].description`}
                  placeholder="Brief description of your project"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].description = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor={`projects[${index}].image`} className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Project Image URL (Optional)
                  </div>
                </Label>
                <Input
                  name={`projects[${index}].image`}
                  type="url"
                  placeholder="https://your-project-image.com"
                  value={project.image}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].image = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
