import { Todo } from "../models/todo.model.js";
import { User } from "../models/User.model.js";

const books = [
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee'
    },
    {
        title: '1984',
        author: 'George Orwell'
    }
];


export const resolvers = {
    Query: {
        books: () => {
            // call to database
            // perform any operation
            return books
        },
        getTodos: async () => {
            const todos = await Todo.findAll()
            return todos
        },
        getTodo: async (root, args) => {
            const todo = await Todo.findByPk(args.id)
            return todo
        },
        users: async () => {
            // call to database
            const users = await User.findAll()
            // perform any operation 

            return users
        }
    },
    Mutation: {
        addTodo: async (root, args) => {
            const newTodo = await Todo.create({
                title: args.title,
                description: args.description,
                data: args.date,
                complete: args.complete
            })
            return newTodo
        }
    }
}