export const getRoadStyle = (roadType: number, roadCondition: number) => {
  let color = "gray";
  let dashArray: string | undefined = undefined;

  if (roadCondition == 3) {
    dashArray = "8 8";
  }

  if (roadCondition == 2) {
    dashArray = "4 4";
  }

  switch (roadType) {
    case 1:
      color = "red";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "blue";
      break;
    default:
      color = "gray";
  }

  return { color, dashArray };
};
