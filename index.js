import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 5017



//// Express Server
app.get('/', (req, res) => {
    res
        .status(200)
        .send('hello world!')
})

app.listen(port, () => {
    console.log(`app running on port ${port} successfully`)
})