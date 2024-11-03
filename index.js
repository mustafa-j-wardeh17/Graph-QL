import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'

import { resolvers } from './graphql/resolvers.js'
import { typeDefs } from './graphql/typeDefs.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5017

////Graph QL
let appolloServer;
async function startServer() {
    appolloServer = new ApolloServer({
        // typeDefs
        typeDefs,
        // resolvers
        resolvers

    })

    await appolloServer.start()
    // make connections between application and appolloServer
    appolloServer.applyMiddleware({ app })
}
startServer()


//// Express Server
app.get('/', (req, res) => {
    res
        .status(200)
        .send('hello world!')
})

app.listen(port, () => {
    console.log(`app running on port ${port} successfully`)
})