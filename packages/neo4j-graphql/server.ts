import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { Neo4jGraphQL } from "@neo4j/graphql"
import neo4j from "neo4j-driver"

const schemaFile = Bun.file("./src/neo4j-schema.gql")

const typeDefs = await schemaFile.text()

const NEO4J_URI = Bun.env.NEO4J_URI
const NEO4J_USERNAME = Bun.env.NEO4J_USERNAME
const NEO4J_PASSWORD = Bun.env.NEO4J_PASSWORD
console.log("NEO4J_URI: ", NEO4J_URI)
console.log("NEO4J_USERNAME: ", NEO4J_USERNAME)
console.log("NEO4J_PASSWORD: ", NEO4J_PASSWORD)
console.log("NEO4J_DATABASE_URL!", Bun.env.NEO4J_DATABASE_URL!)

// const driver = neo4j.driver(Bun.env.NEO4J_DATABASE_URL!)
const driver = neo4j.driver(
	"neo4j+s://65e1caa8.databases.neo4j.io",
	neo4j.auth.basic("neo4j", "Ka8B9fhoZlGBdz4tatKbN8M9WmWQsxJihe21zuxE86E")
)
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
