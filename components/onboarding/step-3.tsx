import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SKILLS } from "@/lib/data";
import { WorkExperience } from "@/types";
import { useOnboardingStore } from "@/store/onbboading";
import { toast } from "sonner";

interface WorkExperienceInput {
  [key: string]: string;
}

export const OnboardingStep3 = () => {
  const { workExperiences, setWorkExperiences } = useOnboardingStore();
  const [workExpSkillInputs, setWorkExpSkillInputs] =
    useState<WorkExperienceInput>({ "1": "" });

  const addWorkExperience = () => {
    if (workExperiences.length > 0) {
      const lastExp = workExperiences[workExperiences.length - 1];
      if (!lastExp.jobTitle || !lastExp.description || !lastExp.startDate)
        return toast.error(
          "Please complete the current work experience before adding a new one."
        );
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
    setWorkExpSkillInputs((prev) => ({ ...prev, [newId]: "" }));
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
    setWorkExpSkillInputs((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const addWorkExpSkill = (expId: string, skill: string) => {
    const exp = workExperiences.find((e) => e.id === expId);
    if (exp && skill && !exp.skills.includes(skill)) {
      updateWorkExperience(expId, "skills", [...exp.skills, skill]);
      setWorkExpSkillInputs((prev) => ({ ...prev, [expId]: "" }));
    }
  };

  const getFilteredWorkExpSkills = (expId: string) => {
    const exp = workExperiences.find((e) => e.id === expId);
    const input = workExpSkillInputs[expId] || "";
    return SKILLS.filter(
      (skill) =>
        skill.toLowerCase().includes(input.toLowerCase()) &&
        !exp?.skills.includes(skill)
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Work Experience</h2>
        <Button onClick={addWorkExperience} variant="outline" size="sm">
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {workExperiences.map((exp, index) => (
          <Card key={exp.id} className="border-border">
            <CardContent className="pt-6 space-y-4">
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

              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={exp.jobTitle}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, "jobTitle", e.target.value)
                  }
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, "description", e.target.value)
                  }
                  placeholder="Describe your role and responsibilities"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.ongoing}
                  />
                </div>
              </div>

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

              <div className="space-y-2">
                <Label>Skills Used</Label>
                <div className="relative">
                  <Input
                    value={workExpSkillInputs[exp.id] || ""}
                    onChange={(e) =>
                      setWorkExpSkillInputs((prev) => ({
                        ...prev,
                        [exp.id]: e.target.value,
                      }))
                    }
                    placeholder="Type to search skills"
                  />
                  {workExpSkillInputs[exp.id] &&
                    getFilteredWorkExpSkills(exp.id).length > 0 && (
                      <Card className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto">
                        <CardContent className="p-2">
                          {getFilteredWorkExpSkills(exp.id).map((skill) => (
                            <div
                              key={skill}
                              className="px-3 py-2 hover:bg-accent rounded cursor-pointer text-sm"
                              onClick={() => addWorkExpSkill(exp.id, skill)}
                            >
                              {skill}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                </div>
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-pointer px-3 py-1"
                        onClick={() =>
                          updateWorkExperience(
                            exp.id,
                            "skills",
                            exp.skills.filter((s) => s !== skill)
                          )
                        }
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
