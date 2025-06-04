import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Funnel } from "lucide-react";

export function FilterDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Funnel />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4"></div>
          <DialogFooter>
            <Button type="submit">Set filter</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
