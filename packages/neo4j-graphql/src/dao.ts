import { GraphQLClient } from "graphql-request"
import { z } from "zod"
import { getSdk } from "./generated/req"

const client = new GraphQLClient("http://localhost:4000/graphql") // This is a local-only server for scraper

const sdk = getSdk(client)

export function getAllAwesomeLists() {
	return sdk.AwesomeLists().then((res) => res.data.awesomeLists)
}
