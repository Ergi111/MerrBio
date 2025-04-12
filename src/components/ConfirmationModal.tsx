import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export const ConfirmationModal = () => {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trash />
            Delete
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button variant="destructive" type="button">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
