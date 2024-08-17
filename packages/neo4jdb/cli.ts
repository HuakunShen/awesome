#!/usr/bin/env node
import { $ } from "bun"
import { program } from "commander"

program.name("Awesome CLI").description("CLI for Scraping Data")

program
	.command("install-labels")
	.description("Install labels/indexes to the database")
	.action(async (opts: {}) => {
		await $`neomodel_install_labels pylib/ogm.py --db ${Bun.env.NEO4J_DATABASE_URL}`
	})

program
	.command("remove-labels")
	.description("Install labels/indexes to the database")
	.action(async (opts: {}) => {
		await $`neomodel_remove_labels --db ${Bun.env.NEO4J_DATABASE_URL}`
	})

program.parse()
