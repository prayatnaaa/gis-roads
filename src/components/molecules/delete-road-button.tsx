import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { deleteRoadById } from "@/actions/delete-road";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type DeleteButtonProps = {
  token: string;
  id: number;
};

const DeleteRoadButton = ({ token, id }: DeleteButtonProps) => {
  const navigate = useNavigate();
  const deleteRoad = async () => {
    const response = await deleteRoadById(token, id);
    if (response.code == 200 || response.status == "success") {
      toast(response.message);
      navigate("/");
      return;
    }
    toast(response.message);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <p className="text-sm text-red-600 hover:cursor-pointer hover:font-semibold">
            Delete
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              road and remove its data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="z-10 bg-red-700 text-white hover:cursor-pointer hover:bg-red-800"
              onClick={deleteRoad}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteRoadButton;
