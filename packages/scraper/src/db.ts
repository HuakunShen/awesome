import { getSdk } from "@awesome/neo4j-graphql"
import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("http://localhost:4000/graphql") // This is a local-only server for scraper

export const neo4jSdk = getSdk(client)
