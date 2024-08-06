import { z } from "zod";

const GetPositionByIdSchema = z.object({
  id: z.string()
    .transform((arg) => Number(arg))
    .refine((arg) => !isNaN(arg), "Id must be a valid number")
    .refine((arg) => arg > 0, { message: "Id must be greater than 0" })
});

export default GetPositionByIdSchema;
