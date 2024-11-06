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
            return books;
        },
        getTodos: async () => {
            try {
                const todos = await Todo.findAll({
                    
                });
                return todos;
            } catch (error) {
                console.error("Error fetching todos:", error);
                throw new Error("Failed to fetch todos");
            }
        },
        getTodo: async (root, args) => {
            try {
                const todo = await Todo.findByPk(args.id);
                if (!todo) throw new Error("Todo not found");
                return todo;
            } catch (error) {
                console.error(`Error fetching todo with id ${args.id}:`, error);
                throw new Error("Failed to fetch todo");
            }
        },
        users: async () => {
            try {
                const users = await User.findAll();
                return users;
            } catch (error) {
                console.error("Error fetching users:", error);
                throw new Error("Failed to fetch users");
            }
        }
    },
    Mutation: {
        addTodo: async (root, args) => {
            try {
                const newTodo = await Todo.create({
                    title: args.title,
                    description: args.description,
                    date: args.date,
                    complete: args.complete
                });
                return newTodo;
            } catch (error) {
                console.error("Error adding todo:", error);
                throw new Error("Failed to add todo");
            }
        },
        deleteTodo: async (root, args) => {
            try {
                const deletedTodoCount = await Todo.destroy({
                    where: { id: args.id }
                });
                if (deletedTodoCount === 0) throw new Error("Todo not found");
                return `Todo with ID ${args.id} deleted successfully`;
            } catch (error) {
                console.error(`Error deleting todo with id ${args.id}:`, error);
                throw new Error("Failed to delete todo");
            }
        },
        updateTodo: async (root, args) => {
            const { id, title, description, complete, date } = args;
            try {
                const findTodo = await Todo.findByPk(id);
                if (!findTodo) throw new Error("Todo not found");

                // Update todo values
                if (title !== undefined) findTodo.title = title;
                if (description !== undefined) findTodo.description = description;
                if (date !== undefined) findTodo.date = date;
                if (complete !== undefined) findTodo.complete = complete;

                await findTodo.save();
                return findTodo;
            } catch (error) {
                console.error(`Error updating todo with id ${id}:`, error);
                throw new Error("Failed to update todo");
            }
        }
    }
};
