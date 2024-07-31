import { z } from "zod";

const CreatePositionSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .max(3, { message: 'Name must have a maximum of 3 characters' })
    .nullable().refine((arg) => arg !== null, { message: "Name cannot be null" }),
  zone: z.number()
    .nullable().refine((arg) => arg !== null, { message: "Zone cannot be null" }),
  maximumPlayers: z.number()
    .gt(0, { message: 'Maximum Players must be grater than 0' }).nullable().optional()
});

export default CreatePositionSchema;
