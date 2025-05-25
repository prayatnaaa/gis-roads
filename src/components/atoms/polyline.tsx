import { useMapEvents } from "react-leaflet";
import type { LatLngLiteral } from "leaflet";

type ClickableMapProps = {
  onClick: (latlng: LatLngLiteral) => void;
  onRightClick?: () => void;
};

const ClickableMap: React.FC<ClickableMapProps> = ({
  onClick,
  onRightClick,
}) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
    contextmenu() {
      if (onRightClick) onRightClick();
    },
  });

  return null;
};

export default ClickableMap;
