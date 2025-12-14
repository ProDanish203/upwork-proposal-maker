import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOnboardingStore } from "@/store/onbboading";

export const OnboardingStep2 = () => {
  const {
    githubUrl,
    setGithubUrl,
    portfolioUrl,
    setPortfolioUrl,
    linkedinUrl,
    setLinkedinUrl,
    otherLinks,
    setOtherLinks,
  } = useOnboardingStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-medium">Social Links</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="github">
            GitHub URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="github"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio URL</Label>
          <Input
            id="portfolio"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="other">Other Social Links</Label>
          <Textarea
            id="other"
            value={otherLinks}
            onChange={(e) => setOtherLinks(e.target.value)}
            placeholder="Add any other social links (one per line)"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
