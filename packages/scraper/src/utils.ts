export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function isOutDated(updateDatetime: Date, lifeMs: number) {
	console.log("updateDatetime", updateDatetime)

	const now = new Date()
	const threshold = new Date(now.getTime() - lifeMs)
	return updateDatetime < threshold
}
