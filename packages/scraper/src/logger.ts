import chalk from "chalk"

function makeLogger(colorFn: (...text: unknown[]) => void, logFn: (...text: unknown[]) => void) {
	return function log(...text: unknown[]) {
		logFn(colorFn(...text))
	}
}

export const logger = {
	info: makeLogger(chalk.blue, console.log),
	warn: makeLogger(chalk.yellow, console.warn),
	error: makeLogger(chalk.red, console.error),
	success: makeLogger(chalk.green, console.log),
	debug: makeLogger(chalk.gray, console.debug),
	trace: makeLogger(chalk.gray, console.trace),
	log: console.log
}
