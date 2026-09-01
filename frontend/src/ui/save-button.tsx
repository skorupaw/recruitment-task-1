import { Button } from "@/ui/primitives/button";
import { Loader2 } from "lucide-react";
import React from "react";

export type SaveButtonProps = {
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSaving: boolean;
};

export const SaveButton = ({ onSave, isSaving }: SaveButtonProps) => {
  return (
    <Button onClick={onSave} disabled={isSaving} variant="default">
      {isSaving && <Loader2 className="animate-spin" />}
      Save
    </Button>
  );
};
