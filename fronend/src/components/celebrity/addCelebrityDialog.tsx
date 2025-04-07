import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCelebrityForm from "./addCelebrityForm";
import { useState } from "react";

export function AddCelebrityDialog({ type }: { type: string }) {
  const [open, setOpen] = useState(false);
  const postSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-foreground">
          add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  ">
        <DialogHeader>
          <h1 className="font-bold text-xl">Add Celebrity</h1>
        </DialogHeader>
        <AddCelebrityForm postSubmit={postSubmit} celebrityType={type} />
      </DialogContent>
    </Dialog>
  );
}
