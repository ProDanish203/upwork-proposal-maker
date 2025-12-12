"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { OnboardingStep1 } from "@/components/onboarding/step-1";
import { OnboardingStep2 } from "@/components/onboarding/step-2";
import { OnboardingStep3 } from "@/components/onboarding/step-3";
import { OnboardingStep4 } from "@/components/onboarding/step-4";
import { OnboardingStep5 } from "@/components/onboarding/step-5";
import { useOnboardingStore } from "@/store/onbboading";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("Danish");
  const {
    fullname,
    age,
    introduction,
    roles: selectedRoles,
    skills: selectedSkills,
    githubUrl,
    workExperiences,
    projects,
    writingStyle,
    sampleProposal,
  } = useOnboardingStore();

  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {currentStep < 5 && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-2">
                Welcome {userName}, let's get you onboard
              </h1>
              <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-12 rounded-full transition-colors ${
                      index <= currentStep ? "bg-foreground" : "bg-border"
                    }`}
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
                    disabled={currentStep === 0}
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!canProceed()}>
                    {currentStep === 4 ? "Complete" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Final Step: Success */}
        {currentStep === 5 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-20 h-20 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Onboarding Complete
              </h1>
              <p className="text-muted-foreground text-lg">
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
