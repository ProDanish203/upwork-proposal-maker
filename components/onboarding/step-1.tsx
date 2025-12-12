"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ROLES, SKILLS } from "@/lib/data";
import { useOnboardingStore } from "@/store/onbboading";

export const OnboardingStep1 = () => {
  const {
    fullname,
    setFullname,
    age,
    setAge,
    introduction,
    setIntroduction,
    skills,
    setSkills,
    removeSkill,
    roles,
    setRoles,
    removeRole,
  } = useOnboardingStore();

  const [skillInput, setSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");

  const addRole = (role: string) => {
    if (role && !roles.includes(role)) {
      setRoles([...roles, role]);
      setRoleInput("");
    }
  };

  const filteredRoles = ROLES.filter(
    (role) =>
      role.toLowerCase().includes(roleInput.toLowerCase()) &&
      !roles.includes(role)
  );

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput("");
    }
  };

  const filteredSkills = SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !skills.includes(skill)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-medium">Basic Information</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="introduction">Introduction</Label>
          <Textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Write a complete introduction about yourself"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roles">Roles</Label>
          <div className="relative">
            <Input
              id="roles"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="Type to search roles"
            />
            {roleInput && filteredRoles.length > 0 && (
              <Card className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto">
                <CardContent className="p-2">
                  {filteredRoles.map((role) => (
                    <div
                      key={role}
                      className="px-3 py-2 hover:bg-accent rounded cursor-pointer text-sm"
                      onClick={() => addRole(role)}
                    >
                      {role}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
          {roles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {roles.map((role) => (
                <Badge
                  key={role}
                  variant="secondary"
                  className="px-3 py-1 cursor-pointer"
                  onClick={() => removeRole(role)}
                >
                  {role} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <div className="relative">
            <Input
              id="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Type to search skills"
            />
            {skillInput && filteredSkills.length > 0 && (
              <Card className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto">
                <CardContent className="p-2">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 hover:bg-accent rounded cursor-pointer text-sm"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
