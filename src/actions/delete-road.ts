export const deleteRoadById = async (
  token: string,
  id: number
): Promise<{
  status: string;
  code: number;
  message: string;
}> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/ruasjalan/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return {
        message: "Failed to delete road",
        status: "false",
        code: response.status,
      };
    }

    return {
      status: "success",
      code: response.status,
      message: "Road deleted successfully",
    };
  } catch (error) {
    return {
      message: error as string,
      code: 405,
      status: "false",
    };
  }
};
