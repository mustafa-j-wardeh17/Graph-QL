export const typeDefs = `#graphql
    type Book {
        title: String
        author: String
    }
    scalar Date
    type Todo {
        id:String
        title: String!
        description: String
        complete: Boolean
        date: Date
    }
    type User {
        fullName:String
        email:String
        password:String
        googleId:String
        picture:String
    }
    type Query {
        books:[Book]
        users:[User]
        getTodos:[Todo]
    }

    type Mutation {
        addTodo(title:String,description:String,date:Date,complete:Boolean):Todo
    }
`