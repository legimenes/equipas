import { z } from "zod";

const CreatePlayerSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z0-9]+$/),
  level: z.number().gt(0).lte(5),
  position: z.string().min(1).max(2).regex(/^[A-Z]+$/),
});

export default CreatePlayerSchema;
