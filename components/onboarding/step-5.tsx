import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { WRITING_STYLES } from "@/lib/data";
import { Textarea } from "../ui/textarea";
import { useOnboardingStore } from "@/store/onbboading";

export const OnboardingStep5 = () => {
  const { writingStyle, setWritingStyle, sampleProposal, setSampleProposal } =
    useOnboardingStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-medium">Writing Preferences</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="writingStyle">Choose Writing Style</Label>
          <Select value={writingStyle} onValueChange={setWritingStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Select a writing style" />
            </SelectTrigger>
            <SelectContent>
              {WRITING_STYLES.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sampleProposal">Sample Proposal</Label>
          <Textarea
            id="sampleProposal"
            value={sampleProposal}
            onChange={(e) => setSampleProposal(e.target.value)}
            placeholder="Write a sample proposal to help us understand your preferred tone and style"
            rows={8}
          />
        </div>
      </div>
    </div>
  );
};
