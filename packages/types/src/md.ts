import { z } from "zod"

export const MarkdownLink = z.object({
	text: z.string().optional(),
	url: z.string()
})
export type MarkdownLink = z.infer<typeof MarkdownLink>
