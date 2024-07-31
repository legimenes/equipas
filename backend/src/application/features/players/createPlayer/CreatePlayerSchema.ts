import { z } from "zod";

const CreatePlayerSchema = z.object({
  // name: z.string().nullable().refine((val) => val !== null && val !== '', {
  //   message: "Name cannot be null",
  // }),
  // name: z.string().min(2).max(100).regex(/^[a-zA-Z0-9]+$/),
  // name: z.string().nullable(),
  name: z.string()
    .min(2, { message: 'Name is required' })
    .nullable().refine((arg) => arg !== null, { message: "Name cannot be null" }),
  level: z.number()
    .gt(0, { message: 'Level must be between 1 and 5' })
    .lte(5, { message: 'Level must be between 1 and 5' }),
  position: z.string().min(1).max(2).regex(/^[A-Z]+$/),
});

export default CreatePlayerSchema;
