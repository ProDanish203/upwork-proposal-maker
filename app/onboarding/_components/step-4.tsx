import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types";
import { useOnboardingStore } from "@/store/onbboading";
import { toast } from "sonner";

export const OnboardingStep4 = () => {
  const { projects, setProjects } = useOnboardingStore();

  const addProject = () => {
    // Dont add new project if the last one is incomplete
    if (projects.length > 0) {
      const lastProject = projects[projects.length - 1];
      if (!lastProject.title || !lastProject.description || !lastProject.link)
        return toast.error(
          "Please complete the current project before adding a new one."
        );
    }
    setProjects([
      ...projects,
      { id: Date.now().toString(), title: "", description: "", link: "" },
    ]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Projects</h2>
        <Button onClick={addProject} variant="outline" size="sm">
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={project.id} className="border-border">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Project {index + 1}</h3>
                {projects.length > 1 && (
                  <Button
                    onClick={() => removeProject(project.id)}
                    variant="ghost"
                    size="sm"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) =>
                    updateProject(project.id, "title", e.target.value)
                  }
                  placeholder="e.g., E-commerce Platform"
                />
              </div>

              <div className="space-y-2">
                <Label>Project Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, "description", e.target.value)
                  }
                  placeholder="Describe the project, your role, and key achievements"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Project Link</Label>
                <Input
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, "link", e.target.value)
                  }
                  placeholder="https://project-demo.com"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
