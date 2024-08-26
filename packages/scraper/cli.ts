#!/usr/bin/env node
import {
	refreshAwesomeListRepos,
	refreshDraftRepoData,
	refreshIsAwesome,
	refreshNewAwesomeList,
	refreshOutDatedRepoData
} from "@/cmds"
import { logger } from "@/logger"
import { program } from "commander"

program.name("Awesome CLI").description("CLI for Scraping Data")

program
	.command("refresh")
	.description("Refresh database awesome data")
	.option("--new-awesome-list", "Add new awesome list to DB", false)
	.option("--awesome-list-repos", "Check new repos added to Awesome Lists", false)
	.option("--outdated-repos", "Refresh Repo Data for outdated repos", false)
	.option("--batch", "Batch Mode (Try batch processing when possible)", false)
	.option("--force", "Force Refresh", false)
	.option(
		"--draft-repos",
		"Refresh Repo data for repos that are still in draft mode (no data at all)",
		false
	)
	.option("--is-awesome", "Refresh relation between repo and awesome list", false)
	.action(
		async (opts: {
			newAwesomeList: boolean
			awesomeListRepos: boolean
			// reconnect: boolean
			draftRepos: boolean
			outdatedRepos: boolean
			batch: boolean
			force: boolean
			isAwesome: boolean
		}) => {
			console.log("Refreshing", opts)
			if (opts.newAwesomeList) {
				await refreshNewAwesomeList()
			} else if (opts.awesomeListRepos) {
				await refreshAwesomeListRepos({ batch: opts.batch, force: opts.force })
			} else if (opts.outdatedRepos) {
				await refreshOutDatedRepoData({ batch: opts.batch })
			} else if (opts.draftRepos) {
				await refreshDraftRepoData({ batch: opts.batch })
			} else if (opts.isAwesome) {
				await refreshIsAwesome()
			} else {
				logger.error("Please specify what to refresh")
			}
		}
	)

program.parse()
