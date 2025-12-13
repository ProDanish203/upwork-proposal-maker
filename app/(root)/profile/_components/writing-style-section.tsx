import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOnboardingStore } from "@/store/onbboading";

export const WritingStyleSection = ({
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
  const { writingStyle, setWritingStyle, sampleProposal, setSampleProposal } =
    useOnboardingStore();

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <SectionHeader
          title="Writing Style"
          isEditing={isEditing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          isPending={isPending}
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="writingStyle">Preferred Writing Style</Label>
            {isEditing ? (
              <Textarea
                id="writingStyle"
                value={writingStyle}
                onChange={(e) => setWritingStyle(e.target.value)}
                placeholder="Describe your preferred writing tone and style"
                rows={3}
              />
            ) : (
              <p className="text-sm py-2 whitespace-pre-wrap">{writingStyle}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sampleProposal">Sample Proposal</Label>
            {isEditing ? (
              <Textarea
                id="sampleProposal"
                value={sampleProposal}
                onChange={(e) => setSampleProposal(e.target.value)}
                placeholder="Provide a sample of your proposal writing"
                rows={6}
              />
            ) : (
              <p className="text-sm py-2 whitespace-pre-wrap">
                {sampleProposal}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
