import { GPU, STATUS } from "@/constants/run-data-enum";
import { ARRAY_DELIMITER, RANGE_DELIMITER } from "@/lib/delimiters";
import { z } from "zod";

export const columnSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  gpu: z.enum(GPU),
  status: z.enum(STATUS),
});

export type ColumnSchema = z.infer<typeof columnSchema>;

export const columnFilterSchema = z.object({
  status: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.enum(STATUS).array())
    .optional(),
  date: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
  gpu: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.enum(GPU).array())
    .optional(),
});

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>;
