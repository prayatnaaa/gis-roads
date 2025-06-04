import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const EditRoadButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      className="hover:cursor-pointer"
      variant="secondary"
      onClick={() => {
        navigate(`edit-road/${id}`);
      }}
    >
      Edit road
    </Button>
  );
};

export default EditRoadButton;
