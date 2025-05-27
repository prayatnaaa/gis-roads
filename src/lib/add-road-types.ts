import z from "zod";

export const addRoadSchema = z.object({
  village_id: z.number(),
  road_code: z.number().optional(),
  road_name: z.string().min(1, "Road name is required"),
  length: z.number().positive("Length must be positive"),
  width: z.number().positive("Width must be positive"),
  existing_id: z.number(),
  condition_id: z.number(),
  type_id: z.number(),
  description: z.string().optional(),
  paths: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
    })
  ),
});

export type AddRoadFormData = z.infer<typeof addRoadSchema>;

interface RoadResponse extends AddRoadFormData {
  road_code: number;
}

export type AddRoadResponse = {
  code: number;
  status: "success" | "failed";
  message: string;
  data?: RoadResponse;
};
