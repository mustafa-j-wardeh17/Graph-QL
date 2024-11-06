import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { resolvers } from './graphql/resolvers.js'
import { typeDefs } from './graphql/typeDefs.js'
import authRouter from './Routes/auth.route.js'
import passport from "passport";
import * as google_Auth from './auth/loginWithGoogle.js'

dotenv.config()
const app = express()


//--------------------------------------
//---------------Middleware-------------
//--------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE',
    maxAge
        : 24 * 60 * 60 * 1000 //1 day,
}))



const port = process.env.PORT

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





//--------------------------------------
//----------------Routes----------------
//--------------------------------------
app.use(passport.initialize());
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log(`app running on port ${port} successfully`)
})