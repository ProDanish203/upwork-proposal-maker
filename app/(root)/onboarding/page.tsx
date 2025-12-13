"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { OnboardingStep1 } from "@/components/onboarding/step-1";
import { OnboardingStep2 } from "@/components/onboarding/step-2";
import { OnboardingStep3 } from "@/components/onboarding/step-3";
import { OnboardingStep4 } from "@/components/onboarding/step-4";
import { OnboardingStep5 } from "@/components/onboarding/step-5";
import { useOnboardingStore } from "@/store/onbboading";
import { updateProfile, getUserProfile } from "@/API/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    fullname,
    age,
    introduction,
    roles: selectedRoles,
    skills: selectedSkills,
    githubUrl,
    portfolioUrl,
    linkedinUrl,
    otherLinks,
    workExperiences,
    projects,
    writingStyle,
    sampleProposal,
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
  } = useOnboardingStore();

  const totalSteps = 6;

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    retry: 1,
  });

  useEffect(() => {
    if (profileData?.success && profileData.response && !isInitialized) {
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

      setIsInitialized(true);
    }
  }, [
    profileData,
    isInitialized,
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

  const saveStepData = async (step: number) => {
    try {
      let payload: any = {};

      switch (step) {
        case 0:
          if (
            fullname === profileData?.response.fullname &&
            age === String(profileData?.response.age) &&
            introduction === profileData?.response.introduction &&
            JSON.stringify(selectedRoles) ===
              JSON.stringify(profileData?.response.roles) &&
            JSON.stringify(selectedSkills) ===
              JSON.stringify(profileData?.response.skills)
          )
            return true;
          payload = {
            fullname,
            age,
            introduction,
            roles: selectedRoles,
            skills: selectedSkills,
          };
          break;
        case 1:
          if (
            githubUrl === profileData?.response.githubUrl &&
            portfolioUrl === profileData?.response.portfolioUrl &&
            linkedinUrl === profileData?.response.linkedinUrl &&
            otherLinks === profileData?.response.otherLinks
          )
            return true;

          payload = {
            githubUrl,
            portfolioUrl: portfolioUrl || undefined,
            linkedinUrl: linkedinUrl || undefined,
            otherLinks: otherLinks || undefined,
          };
          break;
        case 2:
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
        case 3:
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
        case 4:
          payload = {
            writingStyle,
            sampleProposal,
            onboarded: true,
          };
          break;
        default:
          return;
      }

      const { response, success } = await updateProfileMutation(payload);
      if (!success) {
        toast.error((response as string) || "Failed to save data");
        return false;
      }
      return true;
    } catch (error) {
      toast.error("Failed to save data");
      return false;
    }
  };

  const nextStep = async () => {
    if (currentStep < totalSteps - 1) {
      const saved = await saveStepData(currentStep);
      if (saved) {
        setCurrentStep(currentStep + 1);

        if (currentStep === 4) {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return (
          fullname.trim() &&
          age.trim() &&
          introduction.trim() &&
          selectedRoles.length > 0 &&
          selectedSkills.length > 0
        );
      case 1:
        return githubUrl.trim();
      case 2:
        return workExperiences.every(
          (exp) => exp.jobTitle.trim() && exp.description.trim()
        );
      case 3:
        return projects.every(
          (project) =>
            project.title.trim() &&
            project.description.trim() &&
            project.link.trim()
        );
      case 4:
        return writingStyle && sampleProposal.trim();
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OnboardingStep1 />;
      case 1:
        return <OnboardingStep2 />;
      case 2:
        return <OnboardingStep3 />;
      case 3:
        return <OnboardingStep4 />;
      case 4:
        return <OnboardingStep5 />;
      default:
        return null;
    }
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {currentStep < 5 && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-2">
                Welcome {fullname}, let's get you onboard
              </h1>
              <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 w-12 rounded-full transition-colors",
                      index <= currentStep ? "bg-foreground" : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>

            <Card className="border-border">
              <CardContent className="pt-6">
                {renderStep()}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={currentStep === 0 || isPending}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed() || isPending}
                    className="min-w-20"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : currentStep === 4 ? (
                      "Complete"
                    ) : (
                      "Next"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {currentStep === 5 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-20 h-20 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Onboarding Complete
              </h1>
              <p className="text-muted-foreground sm:text-lg">
                Your profile has been successfully set up. You're now ready to
                start generating curated proposals for job descriptions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
