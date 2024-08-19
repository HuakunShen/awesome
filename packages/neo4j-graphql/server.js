import fs from "fs"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { Neo4jGraphQL } from "@neo4j/graphql"
import dotenv from "dotenv"
import neo4j from "neo4j-driver"

dotenv.config()

const typeDefs = fs.readFileSync("./src/neo4j-schema.gql").toString("utf-8")
// const schemaFile = Bun.file("./src/neo4j-schema.gql")
// const typeDefs = await schemaFile.text()

const NEO4J_URI = process.env.NEO4J_URI
const NEO4J_USERNAME = process.env.NEO4J_USERNAME
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD
console.log("NEO4J_URI: ", NEO4J_URI)
console.log("NEO4J_USERNAME: ", NEO4J_USERNAME)
console.log("NEO4J_PASSWORD: ", NEO4J_PASSWORD)
// console.log("NEO4J_DATABASE_URL!", process.env.NEO4J_DATABASE_URL!)

// const driver = neo4j.driver(Bun.env.NEO4J_DATABASE_URL!)
const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD))
// const driver = neo4j.driver(NEO4J_URI!, neo4j.auth.basic(NEO4J_USERNAME!, NEO4J_PASSWORD!))
const serverInfo = await driver.getServerInfo()
console.log("Connection established", serverInfo)
const neoSchema = new Neo4jGraphQL({ typeDefs, driver })
const schema = await neoSchema.getSchema()
await neoSchema.assertIndexesAndConstraints({ options: { create: true } })
const server = new ApolloServer({
	schema: schema
})

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 }
})

console.log(`🚀 Server ready at ${url}`)
