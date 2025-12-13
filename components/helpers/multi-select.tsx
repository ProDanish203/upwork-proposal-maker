import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  data: string[];
  selectedItems: string[];
  onAdd: (items: string[]) => void;
  onRemove: (item: string) => void;
  placeholder?: string;
}

export const MultiSelect = ({
  data,
  selectedItems,
  onAdd,
  onRemove,
  placeholder = "Type to search",
}: MultiSelectProps) => {
  const [input, setInput] = useState("");

  const handleAdd = (item: string) => {
    if (item && !selectedItems.includes(item)) {
      onAdd([...selectedItems, item]);
      setInput("");
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.toLowerCase().includes(input.toLowerCase()) &&
      !selectedItems.includes(item)
  );

  return (
    <>
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
        />
        {input && filteredData.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto">
            <CardContent className="p-2">
              {filteredData.map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 hover:bg-accent rounded cursor-pointer text-sm"
                  onClick={() => handleAdd(item)}
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedItems.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="px-3 py-1 cursor-pointer"
              onClick={() => onRemove(item)}
            >
              {item} ×
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};
