"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Camera } from "lucide-react";
import { updateProfile, getUserProfile } from "@/API/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOnboardingStore } from "@/store/onbboading";
import {
  BasicInfoSection,
  ProjectsSection,
  SocialLinksSection,
  WorkExperienceSection,
  WritingStyleSection,
} from "./_components";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    socialLinks: false,
    workExperience: false,
    projects: false,
    writingStyle: false,
  });

  const {
    fullname,
    setFullname,
    age,
    setAge,
    introduction,
    setIntroduction,
    roles,
    setRoles,
    skills,
    setSkills,
    githubUrl,
    setGithubUrl,
    portfolioUrl,
    setPortfolioUrl,
    linkedinUrl,
    setLinkedinUrl,
    otherLinks,
    setOtherLinks,
    workExperiences,
    setWorkExperiences,
    projects,
    setProjects,
    writingStyle,
    setWritingStyle,
    sampleProposal,
    setSampleProposal,
  } = useOnboardingStore();

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    retry: 1,
  });

  useEffect(() => {
    if (profileData?.success && profileData.response) {
      const user = profileData.response;

      if (user.fullname) setFullname(user.fullname);
      if (user.age) setAge(String(user.age));
      if (user.introduction) setIntroduction(user.introduction);
      if (user.roles && user.roles.length > 0) setRoles(user.roles);
      if (user.skills && user.skills.length > 0) setSkills(user.skills);

      if (user.githubUrl) setGithubUrl(user.githubUrl);
      if (user.portfolioUrl) setPortfolioUrl(user.portfolioUrl);
      if (user.linkedinUrl) setLinkedinUrl(user.linkedinUrl);
      if (user.otherLinks) setOtherLinks(user.otherLinks);

      if (user.workExperiences && user.workExperiences.length > 0) {
        const transformedWorkExps = user.workExperiences.map((exp: any) => ({
          id: exp._id.toString(),
          jobTitle: exp.jobTitle || "",
          description: exp.description || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "",
          ongoing: exp.ongoing || false,
          skills: exp.skills || [],
        }));
        setWorkExperiences(transformedWorkExps);
      }

      if (user.projects && user.projects.length > 0) {
        const transformedProjects = user.projects.map((project: any) => ({
          id: project._id.toString(),
          title: project.title || "",
          description: project.description || "",
          link: project.link || "",
        }));
        setProjects(transformedProjects);
      }

      if (user.writingStyle) setWritingStyle(user.writingStyle);
      if (user.sampleProposal) setSampleProposal(user.sampleProposal);
    }
  }, [
    profileData,
    setFullname,
    setAge,
    setIntroduction,
    setRoles,
    setSkills,
    setGithubUrl,
    setPortfolioUrl,
    setLinkedinUrl,
    setOtherLinks,
    setWorkExperiences,
    setProjects,
    setWritingStyle,
    setSampleProposal,
  ]);

  const { mutateAsync: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
  });

  const toggleEdit = (section: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const saveSection = async (section: keyof typeof editMode) => {
    try {
      let payload: any = {};

      switch (section) {
        case "basicInfo":
          payload = { fullname, age, introduction, roles, skills };
          break;
        case "socialLinks":
          payload = {
            githubUrl,
            portfolioUrl: portfolioUrl || undefined,
            linkedinUrl: linkedinUrl || undefined,
            otherLinks: otherLinks || undefined,
          };
          break;
        case "workExperience":
          payload = {
            workExperiences: workExperiences.map((exp) => {
              const workExpPayload: any = {
                jobTitle: exp.jobTitle,
                description: exp.description,
                startDate: exp.startDate,
                endDate: exp.endDate,
                ongoing: exp.ongoing,
                skills: exp.skills,
              };
              if (
                exp.id &&
                exp.id.length === 24 &&
                /^[0-9a-fA-F]{24}$/.test(exp.id)
              ) {
                workExpPayload._id = exp.id;
              }
              return workExpPayload;
            }),
          };
          break;
        case "projects":
          payload = {
            projects: projects.map((project) => {
              const projectPayload: any = {
                title: project.title,
                description: project.description,
                link: project.link,
              };
              if (
                project.id &&
                project.id.length === 24 &&
                /^[0-9a-fA-F]{24}$/.test(project.id)
              ) {
                projectPayload._id = project.id;
              }
              return projectPayload;
            }),
          };
          break;
        case "writingStyle":
          payload = { writingStyle, sampleProposal };
          break;
      }

      const { response, success } = await updateProfileMutation(payload);
      if (!success) {
        toast.error((response as string) || "Failed to save data");
        return;
      }
      toast.success("Profile updated successfully");
      toggleEdit(section);
    } catch (error) {
      toast.error("Failed to save data");
    }
  };

  const cancelEdit = (section: keyof typeof editMode) => {
    if (profileData?.success && profileData.response) {
      const user = profileData.response;

      if (section === "basicInfo") {
        if (user.fullname) setFullname(user.fullname);
        if (user.age) setAge(String(user.age));
        if (user.introduction) setIntroduction(user.introduction);
        if (user.roles) setRoles(user.roles);
        if (user.skills) setSkills(user.skills);
      } else if (section === "socialLinks") {
        if (user.githubUrl) setGithubUrl(user.githubUrl);
        if (user.portfolioUrl) setPortfolioUrl(user.portfolioUrl);
        if (user.linkedinUrl) setLinkedinUrl(user.linkedinUrl);
        if (user.otherLinks) setOtherLinks(user.otherLinks);
      } else if (section === "workExperience") {
        if (user.workExperiences && user.workExperiences.length > 0) {
          const transformedWorkExps = user.workExperiences.map((exp: any) => ({
            id: exp._id.toString(),
            jobTitle: exp.jobTitle || "",
            description: exp.description || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            ongoing: exp.ongoing || false,
            skills: exp.skills || [],
          }));
          setWorkExperiences(transformedWorkExps);
        }
      } else if (section === "projects") {
        if (user.projects && user.projects.length > 0) {
          const transformedProjects = user.projects.map((project: any) => ({
            id: project._id.toString(),
            title: project.title || "",
            description: project.description || "",
            link: project.link || "",
          }));
          setProjects(transformedProjects);
        }
      } else if (section === "writingStyle") {
        if (user.writingStyle) setWritingStyle(user.writingStyle);
        if (user.sampleProposal) setSampleProposal(user.sampleProposal);
      }
    }
    toggleEdit(section);
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center gap-6 pb-8 border-b border-border">
          <div className="relative group">
            <Avatar className="w-32 h-32">
              <AvatarImage src="" alt={fullname} />
              <AvatarFallback className="text-3xl bg-muted">
                {fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-semibold">{fullname}</h1>
            <p className="text-muted-foreground mt-1">
              {roles.join(" • ") || "Developer"}
            </p>
          </div>
        </div>

        <BasicInfoSection
          isEditing={editMode.basicInfo}
          onEdit={() => toggleEdit("basicInfo")}
          onCancel={() => cancelEdit("basicInfo")}
          onSave={() => saveSection("basicInfo")}
          isPending={isPending}
        />

        <SocialLinksSection
          isEditing={editMode.socialLinks}
          onEdit={() => toggleEdit("socialLinks")}
          onCancel={() => cancelEdit("socialLinks")}
          onSave={() => saveSection("socialLinks")}
          isPending={isPending}
        />

        <WorkExperienceSection
          isEditing={editMode.workExperience}
          onEdit={() => toggleEdit("workExperience")}
          onCancel={() => cancelEdit("workExperience")}
          onSave={() => saveSection("workExperience")}
          isPending={isPending}
        />

        <ProjectsSection
          isEditing={editMode.projects}
          onEdit={() => toggleEdit("projects")}
          onCancel={() => cancelEdit("projects")}
          onSave={() => saveSection("projects")}
          isPending={isPending}
        />

        <WritingStyleSection
          isEditing={editMode.writingStyle}
          onEdit={() => toggleEdit("writingStyle")}
          onCancel={() => cancelEdit("writingStyle")}
          onSave={() => saveSection("writingStyle")}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
