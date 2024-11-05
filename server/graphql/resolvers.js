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
        },
        deleteTodo: async (root, args) => {
            const newTodo = await Todo.destroy({
                where: {
                    id: args.id
                }
            })
            return `${newTodo} deleted successfully`
        },
        updateTodo: async (root, args) => {
            const { id, title, description, complete, date } = args
            const findTodo = await Todo.findByPk(id)
            // update todo values
            if (title !== undefined) findTodo.title = title
            if (description !== undefined) findTodo.description = description
            if (date !== undefined) findTodo.date = date
            if (complete !== undefined) findTodo.complete = complete
            await findTodo.save()

            return findTodo
        },
    }
}