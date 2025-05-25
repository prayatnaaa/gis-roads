export const getRoadType = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/mjenisjalan`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { message: "Failed to fetch", success: false };
    }

    const data = await response.json();

    return {
      success: true,
      message: "Success to retrieved road types",
      data: data.jenisjalan,
    };
  } catch (error) {
    return { message: error, success: false };
  }
};

export const getExistingRoad = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/meksisting`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { message: "Failed to fetch", success: false };
    }

    const data = await response.json();

    return {
      success: true,
      message: "Success to retrieved road types",
      data: data.eksisting,
    };
  } catch (error) {
    return { message: error, success: false };
  }
};
