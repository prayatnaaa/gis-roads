import type {
  GetExistingRoadProps,
  GetRoadConditionProps,
  GetRoadTypeProps,
} from "@/lib/region-type";

export const getRoadType = async (token: string): Promise<GetRoadTypeProps> => {
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
      return {
        message: "Failed to fetch",
        status: "false",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      status: "success",
      code: response.status,
      message: "Success to retrieved road types",
      data: {
        types: data.eksisting.map(
          (item: { id: number; jenisjalan: string }) => ({
            id: item.id,
            value: item.jenisjalan,
          })
        ),
      },
    };
  } catch (error) {
    return { message: error as string, code: 405, status: "false" };
  }
};

export const getExistingRoad = async (
  token: string
): Promise<GetExistingRoadProps> => {
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
      return {
        message: "Failed to fetch",
        status: "false",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      status: "success",
      code: response.status,
      message: "Success to retrieved existing roads",
      data: {
        exsisting: data.eksisting.map(
          (item: { id: number; eksisting: string }) => ({
            id: item.id,
            value: item.eksisting,
          })
        ),
      },
    };
  } catch (error) {
    return { message: error as string, code: 405, status: "false" };
  }
};

export const getRoadCondition = async (
  token: string
): Promise<GetRoadConditionProps> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/mkondisi`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return {
        message: "Failed to fetch",
        status: "false",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      status: "success",
      code: response.status,
      message: "Success to retrieved existing roads",
      data: {
        condition: data.eksisting.map(
          (item: { id: number; kondisi: string }) => ({
            id: item.id,
            value: item.kondisi,
          })
        ),
      },
    };
  } catch (error) {
    return { message: error as string, code: 405, status: "false" };
  }
};
