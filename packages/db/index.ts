import { PrismaClient, type AwesomeList, type Prisma } from "@prisma/client"

export const prisma = new PrismaClient()

export class DB {
	get client() {
		return prisma
	}

	/* -------------------------------------------------------------------------- */
	/*                                Awesome List                                */
	/* -------------------------------------------------------------------------- */
	createAwesomeList(data: Prisma.AwesomeListCreateInput) {
		return this.client.awesomeList.create({
			data
		})
	}

	createAwesomeLists(lists: Prisma.AwesomeListCreateInput[]) {
		return this.client.awesomeList.createMany({
			data: lists
		})
	}

	upsertAwesomeList(data: Prisma.AwesomeListCreateInput) {
		return this.client.awesomeList.upsert({
			create: data,
			update: data,
			where: {
				id: data.id,
				url: data.url
			}
		})
	}

	getAllAwesomeLists() {
		return this.client.awesomeList.findMany()
	}

	refreshAwesomeList(id: string) {
		return this.client.awesomeList.update({
			where: {
				id
			},
			data: {
				lastRefreshTime: new Date()
			}
		})
	}

	getOutdatedAwesomeLists(thresholdDate: Date) {
		return this.client.awesomeList.findMany({
			where: {
				lastRefreshTime: {
					lt: thresholdDate
				}
			}
		})
	}

	/* -------------------------------------------------------------------------- */
	/*                                    Repos                                   */
	/* -------------------------------------------------------------------------- */

	createRepo(data: Prisma.RepoCreateInput) {
		return this.client.repo.create({
			data
		})
	}

	createRepos(repos: Prisma.RepoCreateInput[]) {
		return this.client.repo.createMany({
			data: repos
		})
	}

	upsertRepo(data: Prisma.RepoCreateInput) {
		return this.client.repo.upsert({
			create: data,
			update: data,
			where: {
				id: data.id,
				url: data.url
			}
		})
	}

	getOutdatedRepos(thresholdDate: Date) {
		return this.client.repo.findMany({
			where: {
				updatedAt: {
					lt: thresholdDate
				},
				missing: false
			}
		})
	}

	/* -------------------------------------------------------------------------- */
	/*                               Candidate Repos                              */
	/* -------------------------------------------------------------------------- */

	createCandidateRepo(repo: Prisma.CandidateRepoCreateInput) {
		return this.client.candidateRepo.create({
			data: repo
		})
	}

	createCandidateRepos(repos: Prisma.CandidateRepoCreateInput[]) {
		return this.client.candidateRepo.createMany({
			data: repos
		})
	}

	getAllCandidateRepos() {
		return this.client.candidateRepo.findMany()
	}

	deleteCandidateRepo(id: string) {
		return this.client.candidateRepo.delete({
			where: {
				id
			}
		})
	}
}

export const db = new DB()
