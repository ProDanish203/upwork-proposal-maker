import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "./section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboardingStore } from "@/store/onbboading";

export const SocialLinksSection = ({
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
    <Card className="border-border">
      <CardContent className="pt-6">
        <SectionHeader
          title="Social Links"
          isEditing={isEditing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          isPending={isPending}
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            {isEditing ? (
              <Input
                id="github"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
              />
            ) : (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm py-2 block text-blue-500 hover:underline"
              >
                {githubUrl}
              </a>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            {isEditing ? (
              <Input
                id="portfolio"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourportfolio.com"
              />
            ) : (
              portfolioUrl && (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm py-2 block text-blue-500 hover:underline"
                >
                  {portfolioUrl}
                </a>
              )
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            {isEditing ? (
              <Input
                id="linkedin"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            ) : (
              linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm py-2 block text-blue-500 hover:underline"
                >
                  {linkedinUrl}
                </a>
              )
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="other">Other Social Links</Label>
            {isEditing ? (
              <Textarea
                id="other"
                value={otherLinks}
                onChange={(e) => setOtherLinks(e.target.value)}
                placeholder="Add any other social links (one per line)"
                rows={3}
              />
            ) : (
              otherLinks && (
                <p className="text-sm py-2 whitespace-pre-wrap">{otherLinks}</p>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
