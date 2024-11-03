import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { resolvers } from './graphql/resolvers.js'
import { typeDefs } from './graphql/typeDefs.js'
import { User } from './models/User.model.js'
import authRouter from './Routes/auth.route.js'
import passport from "passport";
import * as google_Auth from './auth/loginWithGoogle.js'

dotenv.config()
const app = express()
app.use(express.json())

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




//--------------------------------------
//-------------Cookie Parse-------------
//--------------------------------------
app.use(cookieParser())

//--------------------------------------
//-----------------CORS-----------------
//--------------------------------------
app.use(cors({
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE'
}))



//--------------------------------------
//----------------Routes----------------
//--------------------------------------
app.use(passport.initialize());
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log(`app running on port ${port} successfully`)
})