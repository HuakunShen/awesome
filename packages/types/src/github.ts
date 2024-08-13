import { z } from "zod"

export const Repo = z.object({
	owner: z.string(),
	name: z.string()
})

export type Repo = z.infer<typeof Repo>
