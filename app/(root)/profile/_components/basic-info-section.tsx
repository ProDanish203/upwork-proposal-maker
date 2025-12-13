import { Card, CardContent } from "@/components/ui/card";
import { useOnboardingStore } from "@/store/onbboading";
import { SectionHeader } from "./section-header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ROLES, SKILLS } from "@/lib/data";
import { MultiSelect } from "@/components/helpers/multi-select";

export const BasicInfoSection = ({
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
  const {
    fullname,
    setFullname,
    age,
    setAge,
    introduction,
    setIntroduction,
    roles,
    setRoles,
    removeRole,
    skills,
    setSkills,
    removeSkill,
  } = useOnboardingStore();

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <SectionHeader
          title="Basic Information"
          isEditing={isEditing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          isPending={isPending}
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              {isEditing ? (
                <Input
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-sm py-2">{fullname}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                />
              ) : (
                <p className="text-sm py-2">{age}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="introduction">Introduction</Label>
            {isEditing ? (
              <Textarea
                id="introduction"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Write a complete introduction about yourself"
                rows={4}
              />
            ) : (
              <p className="text-sm py-2 whitespace-pre-wrap">{introduction}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Roles</Label>
            {isEditing ? (
              <MultiSelect
                data={ROLES}
                selectedItems={roles}
                onAdd={setRoles}
                onRemove={removeRole}
                placeholder="Type to search roles"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge key={role} variant="secondary" className="px-3 py-1">
                    {role}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            {isEditing ? (
              <MultiSelect
                data={SKILLS}
                selectedItems={skills}
                onAdd={setSkills}
                onRemove={removeSkill}
                placeholder="Type to search skills"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
