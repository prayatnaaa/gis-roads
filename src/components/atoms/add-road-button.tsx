import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AddRoadButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="secondary"
      className="hover:cursor-pointer"
      onClick={() => {
        navigate("add-road");
      }}
    >
      Add road
    </Button>
  );
};

export default AddRoadButton;
