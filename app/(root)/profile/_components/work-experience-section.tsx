import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/lib/data";
import { useOnboardingStore } from "@/store/onbboading";
import { toast } from "sonner";
import { WorkExperience } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/helpers/multi-select";

export const WorkExperienceSection = ({
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
  const { workExperiences, setWorkExperiences } = useOnboardingStore();

  const addWorkExperience = () => {
    if (workExperiences.length > 0) {
      const lastExp = workExperiences[workExperiences.length - 1];
      if (!lastExp.jobTitle || !lastExp.description || !lastExp.startDate) {
        toast.error(
          "Please complete the current work experience before adding a new one."
        );
        return;
      }
    }

    const newId = Date.now().toString();
    setWorkExperiences([
      ...workExperiences,
      {
        id: newId,
        jobTitle: "",
        description: "",
        startDate: "",
        endDate: "",
        ongoing: false,
        skills: [],
      },
    ]);
  };

  const updateWorkExperience = (
    id: string,
    field: keyof WorkExperience,
    value: any
  ) => {
    setWorkExperiences(
      workExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  const removeSkillFromExperience = (expId: string, skillToRemove: string) => {
    const exp = workExperiences.find((e) => e.id === expId);
    if (exp) {
      updateWorkExperience(
        expId,
        "skills",
        exp.skills.filter((s) => s !== skillToRemove)
      );
    }
  };

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <SectionHeader
          title="Experience"
          isEditing={isEditing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          isPending={isPending}
          showAddButton={isEditing}
          onAdd={addWorkExperience}
          addButtonText="Add Experience"
        />

        <div className="space-y-6">
          {workExperiences.map((exp, index) => (
            <Card key={exp.id} className="border-border">
              <CardContent className="pt-6 space-y-4">
                {isEditing && (
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Experience {index + 1}</h3>
                    {workExperiences.length > 1 && (
                      <Button
                        onClick={() => removeWorkExperience(exp.id)}
                        variant="ghost"
                        size="sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Job Title</Label>
                  {isEditing ? (
                    <Input
                      value={exp.jobTitle}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, "jobTitle", e.target.value)
                      }
                      placeholder="e.g., Senior Frontend Developer"
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{exp.jobTitle}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateWorkExperience(
                          exp.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe your role and responsibilities"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm py-2 whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={exp.startDate}
                        className="max-sm:text-sm"
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <p className="text-sm py-2">
                        {new Date(exp.startDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={exp.endDate}
                        className="max-sm:text-sm"
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        disabled={exp.ongoing}
                      />
                    ) : (
                      <p className="text-sm py-2">
                        {exp.ongoing
                          ? "Present"
                          : new Date(exp.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`ongoing-${exp.id}`}
                      checked={exp.ongoing}
                      onCheckedChange={(checked) =>
                        updateWorkExperience(exp.id, "ongoing", checked)
                      }
                    />
                    <label
                      htmlFor={`ongoing-${exp.id}`}
                      className="text-sm cursor-pointer"
                    >
                      Currently working here
                    </label>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Skills Used</Label>
                  {isEditing ? (
                    <MultiSelect
                      data={SKILLS}
                      selectedItems={exp.skills}
                      onAdd={(skills) =>
                        updateWorkExperience(exp.id, "skills", skills)
                      }
                      onRemove={(skill) =>
                        removeSkillFromExperience(exp.id, skill)
                      }
                      placeholder="Type to search skills"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
