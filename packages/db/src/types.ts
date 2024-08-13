import { z } from "zod"

export const AwesomeListRow = z.object({
	name: z.string(),
	url: z.string().url()
})
export type AwesomeListRow = z.infer<typeof AwesomeListRow>

export const RepoRow = z.object({
	name: z.string(),
	stars: z.number(),
	description: z.string(),
	awesome_list_id: z.number(),
	metadata: z.any(),
	url: z.string().url()
})
export type RepoRow = z.infer<typeof RepoRow>
