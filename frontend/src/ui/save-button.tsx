import { Button } from "@/ui/primitives/button";
import { Loader2 } from "lucide-react";
import React, { useMemo } from "react";

export type SaveButtonProps = {
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSaving: boolean;
};

export const SaveButton = ({ onSave, isSaving }: SaveButtonProps) => {
  const loader = useMemo(() => <Loader2 className="animate-spin" />, []);

  return (
    <Button onClick={onSave} disabled={isSaving} variant="default">
      {isSaving && loader}
      Save
    </Button>
  );
};
