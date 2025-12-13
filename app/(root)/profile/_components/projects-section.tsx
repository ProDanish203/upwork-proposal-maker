import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "./section-header";
import { useOnboardingStore } from "@/store/onbboading";
import { toast } from "sonner";
import { Project } from "@/types";

export const ProjectsSection = ({
  isEditing,
  onEdit,
  onCancel,
  onSave,
  isPending,
}: {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isPending: boolean;
}) => {
  const { projects, setProjects } = useOnboardingStore();

  const addProject = () => {
    if (projects.length > 0) {
      const lastProject = projects[projects.length - 1];
      if (!lastProject.title || !lastProject.description || !lastProject.link) {
        toast.error(
          "Please complete the current project before adding a new one."
        );
        return;
      }
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
    <Card className="border-border">
      <CardContent className="pt-6">
        <SectionHeader
          title="Projects"
          isEditing={isEditing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          isPending={isPending}
          showAddButton={isEditing}
          onAdd={addProject}
          addButtonText="Add Project"
        />

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={project.id} className="border-border">
              <CardContent className="pt-6 space-y-4">
                {isEditing && (
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
                )}

                <div className="space-y-2">
                  <Label>Project Title</Label>
                  {isEditing ? (
                    <Input
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, "title", e.target.value)
                      }
                      placeholder="e.g., E-commerce Platform"
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{project.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Project Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, "description", e.target.value)
                      }
                      placeholder="Describe the project, your role, and key achievements"
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm py-2 whitespace-pre-wrap">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Project Link</Label>
                  {isEditing ? (
                    <Input
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, "link", e.target.value)
                      }
                      placeholder="https://project-demo.com"
                    />
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm py-2 block text-blue-500 hover:underline"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
