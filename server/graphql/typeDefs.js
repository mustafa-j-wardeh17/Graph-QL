export const typeDefs = `#graphql
    type Book {
        title: String
        author: String
    }
    scalar Date
    scalar Number
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
    type SearchResult {
        todos: [Todo]
        totalTodos: Int
    }
    type Query {
        books:[Book]
        users:[User]
        getTodos:[Todo]
        getTodo(id:ID!):Todo
        getSearchTodos(search:String, page:Number):SearchResult
    }

    type Mutation {
        addTodo(title:String,description:String,date:Date,complete:Boolean):Todo
        deleteTodo(id:ID!):String
        updateTodo(id:ID!,title:String,description:String,date:Date,complete:Boolean):Todo
    }
`