"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROLES, SKILLS } from "@/lib/data";
import { useOnboardingStore } from "@/store/onbboading";
import { MultiSelect } from "@/components/helpers/multi-select";

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
          <MultiSelect
            data={ROLES}
            selectedItems={roles}
            onAdd={setRoles}
            onRemove={removeRole}
            placeholder="Type to search roles"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <MultiSelect
            data={SKILLS}
            selectedItems={skills}
            onAdd={setSkills}
            onRemove={removeSkill}
            placeholder="Type to search skills"
          />
        </div>
      </div>
    </div>
  );
};
