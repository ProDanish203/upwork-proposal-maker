import { Button } from "@/components/ui/button";
import { Check, Edit2, Loader2, Plus, X } from "lucide-react";

export const SectionHeader = ({
  title,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  isPending,
  showAddButton = false,
  onAdd,
  addButtonText = "Add",
}: {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isPending: boolean;
  showAddButton?: boolean;
  onAdd?: () => void;
  addButtonText?: string;
}) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-medium">{title}</h2>
    {!isEditing ? (
      <Button onClick={onEdit} variant="outline" size="sm">
        <Edit2 className="w-4 h-4 mr-2" />
        Edit
      </Button>
    ) : (
      <div className="flex gap-2">
        {showAddButton && onAdd && (
          <Button onClick={onAdd} variant="outline" size="sm">
            <span className="max-sm:hidden">{addButtonText}</span>
            <Plus className="sm:hidden size-4" />
          </Button>
        )}
        <Button
          onClick={onCancel}
          variant="outline"
          size="sm"
          disabled={isPending}
        >
          <X className="w-4 h-4 sm:mr-2" />
          <span className="max-sm:hidden">Cancel</span>
        </Button>
        <Button onClick={onSave} size="sm" disabled={isPending}>
          {isPending ? (
            <Loader2 className="w-4 h-4 sm:mr-2 animate-spin" />
          ) : (
            <Check className="w-4 h-4 sm:mr-2" />
          )}
          <span className="max-sm:hidden">Save</span>
        </Button>
      </div>
    )}
  </div>
);
