import { PrismaClient, type AwesomeList, type Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export class DB {
	/* -------------------------------------------------------------------------- */
	/*                                Awesome List                                */
	/* -------------------------------------------------------------------------- */
	createAwesomeList(data: Prisma.AwesomeListCreateInput) {
		return prisma.awesomeList.create({
			data
		})
	}

	/* -------------------------------------------------------------------------- */
	/*                                    Repos                                   */
	/* -------------------------------------------------------------------------- */

	createRepo(data: Prisma.RepoCreateInput) {
		return prisma.repo.create({
			data
		})
	}

	createRepos(repos: Prisma.RepoCreateInput[]) {
		return prisma.repo.createMany({
			data: repos
		})
	}

	/* -------------------------------------------------------------------------- */
	/*                               Candidate Repos                              */
	/* -------------------------------------------------------------------------- */

	createCandidateRepo(repo: Prisma.CandidateRepoCreateInput) {
		return prisma.candidateRepo.create({
			data: repo
		})
	}

	createCandidateRepos(repos: Prisma.CandidateRepoCreateInput[]) {
		return prisma.candidateRepo.createMany({
			data: repos
		})
	}
}

export const db = new DB()
