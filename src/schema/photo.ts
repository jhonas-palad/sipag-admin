import * as z from "zod";

export const PhotoSchema = z.object({
  id: z.string().readonly(),
  img_file: z.string().url(),
  hash: z.string().readonly(),
});

export type PhotoSchemaT = z.infer<typeof PhotoSchema>;
