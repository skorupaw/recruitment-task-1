import { Button } from "@/ui/primitives/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/ui/primitives/dialog";
import { memo } from "react";

export type SaveMoodsDialogProps = {
  isOpen: boolean;
  onChangeOpen: (open: boolean) => void;
};

export const MoodSaveSuccessModal = memo<SaveMoodsDialogProps>(
  ({ isOpen, onChangeOpen }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onChangeOpen}>
        <DialogContent>
          <DialogHeader className="flex w-full items-center justify-center">
            <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
              <span
                className="text-2xl"
                role="img"
                aria-label="Celebration emoji"
              >
                🥳
              </span>
            </div>
          </DialogHeader>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-foreground text-2xl font-bold">
              Congratulations!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Your moods have been successfully saved!
            </DialogDescription>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onChangeOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
MoodSaveSuccessModal.displayName = "MoodSaveSuccessModal";
