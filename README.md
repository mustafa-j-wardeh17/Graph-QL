# GraphQL Project

## Table of Contents
1. [Difference Between REST API and GraphQL](#difference-between-rest-api-and-graphql)
2. [Choosing an ORM over Direct Database Queries](#choosing-an-orm-over-direct-database-queries)
3. [ORM Comparison](#orm-comparison)
4. [Single Sign-On (SSO) with Google Authentication](#single-sign-on-sso-with-google-authentication)
5. [Using Cookies vs Local Storage](#using-cookies-vs-local-storage)
6. [Setting Up Sequelize with PostgreSQL](#setting-up-sequelize-with-postgresql)
7. [Connecting Apollo Server](#connecting-apollo-server)
8. [Creating Models](#creating-models)
9. [Creating Resolvers and Type Definitions](#creating-resolvers-and-type-definitions)

---

## Difference Between REST API and GraphQL

| Feature                       | REST API                          | GraphQL                             |
|-------------------------------|-----------------------------------|-------------------------------------|
| Data Fetching                 | Multiple endpoints for different data | Single endpoint for all data      |
| Response Structure             | Fixed response structure           | Flexible response structure         |
| Over-fetching/Under-fetching  | Often returns too much or too little data | Clients specify exactly what they need |
| Versioning                    | Needs versioning for changes      | No versioning needed, evolves naturally |
| Caching                       | Built-in HTTP caching             | Custom caching strategies           |

## Choosing an ORM over Direct Database Queries

Using an Object-Relational Mapping (ORM) tool such as Sequelize over direct PostgreSQL queries provides several advantages:

1. **Prevention of SQL Injection**: ORMs use parameterized queries to avoid SQL injection vulnerabilities, making your application more secure.
2. **Ease of Writing**: ORMs allow you to write database queries using JavaScript or TypeScript objects rather than SQL syntax, making it easier to manage.
3. **Database Abstraction**: An ORM provides a layer of abstraction over the database, allowing for easier migrations between different database systems if needed.
4. **Built-in Features**: ORMs often come with built-in features such as validation, associations, and easier model management.

## ORM Comparison

| Feature       | Sequelize                    | TypeORM                       | Prisma                          |
|---------------|------------------------------|-------------------------------|----------------------------------|
| Language      | JavaScript                   | TypeScript                    | TypeScript                       |
| Best for      | Node.js applications         | NestJS applications           | Modern apps with strong typing   |
| Features      | Promise-based, migrations     | Decorators, Active Record    | Type-safe queries, migrations    |
| Learning Curve| Moderate                     | Moderate to steep             | Easy to moderate                 |

**Note**: Sequelize is chosen for this project due to its compatibility with JavaScript, while TypeORM is typically preferred for TypeScript-heavy projects, especially with NestJS.

## Single Sign-On (SSO) with Google Authentication

Google SSO allows users to authenticate using their Google accounts. Here’s how it works:

1. **User Clicks "Login with Google"**: The client sends a request to your server with the Google OAuth 2.0 client ID and secret.
2. **Redirect to Google**: The server redirects the user to the Google authorization page.
3. **User Grants Permission**: The user approves access to their profile data.
4. **Receive Authorization Code**: After granting permission, Google redirects back to your server with an authorization code.
5. **Request Access Token**: The server sends the authorization code along with the client ID and secret to Google’s token endpoint to receive an access token.
6. **Fetch User Profile**: The server uses the access token to request the user's profile data from Google.

## Using Cookies vs Local Storage

### Reasons to Use Cookies for JWT Storage:
1. **Security Against XSS**: Cookies can be set as `HttpOnly`, making them inaccessible to JavaScript, thus protecting against cross-site scripting (XSS) attacks.
2. **Max Age and Expiration**: Cookies can have a max age set, automatically handling expiration, while local storage requires manual management.
3. **Automatic Sending**: Cookies are automatically sent with each HTTP request to the same origin, which can simplify authentication flow.

## Setting Up Sequelize with PostgreSQL

To set up Sequelize with PostgreSQL, you can use the following code:

```javascript
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost', 
        dialect: "postgres",
        logging: false
    }
);


sequelize.sync({ force: false, alter: true })
    .then(() => console.log("Database synchronized"))
    .catch((error) => console.log("Error synchronizing database", error));

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
})();

export { sequelize };
```

## Connecting Apollo Server

To connect Apollo Server with your Express app, you can use the following code:

```javascript
import { ApolloServer } from 'apollo-server-express';

let appolloServer;
async function startServer() {
    appolloServer = new ApolloServer({
        // typeDefs
        typeDefs,
        // resolvers
        resolvers
    });

    await appolloServer.start();
    // Make connections between application and appolloServer
    appolloServer.applyMiddleware({ app });
}
startServer();
```

## Creating Models

Creating models with Sequelize is straightforward. Here's an example of a Todo model:

```javascript
import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Todo = sequelize.define("Todo", {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Automatically sets the current date and time
    },
    complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});
```

## Creating Resolvers and Type Definitions

Creating resolvers and type definitions in GraphQL is essential for handling queries and mutations. Here’s a simple example:

### Type Definitions
```graphql
type Todo {
    id: ID!
    title: String
    description: String
    date: String
    complete: Boolean
}

type Query {
    getTodos: [Todo]
    getTodo(id: ID!): Todo
}

type Mutation {
    addTodo(title: String!, description: String, date: String, complete: Boolean): Todo
    updateTodo(id: ID!, title: String, description: String, date: String, complete: Boolean): Todo
    deleteTodo(id: ID!): String
}
```
### Resolvers
```javascript
import { Todo } from "../models/todo.model.js";

export const resolvers = {
    Query: {
        getTodos: async () => {
            return await Todo.findAll();
        },
        getTodo: async (root, args) => {
            return await Todo.findByPk(args.id);
        }
    },
    Mutation: {
        addTodo: async (root, args) => {
            const newTodo = await Todo.create({
                title: args.title,
                description: args.description,
                date: args.date,
                complete: args.complete
            });
            return newTodo;
        },
        updateTodo: async (root, args) => {
            const todo = await Todo.findByPk(args.id);
            if (todo) {
                todo.title = args.title || todo.title;
                todo.description = args.description || todo.description;
                todo.date = args.date || todo.date;
                todo.complete = args.complete !== undefined ? args.complete : todo.complete;
                await todo.save();
                return todo;
            }
            throw new Error("Todo not found");
        },
        deleteTodo: async (root, args) => {
            const result = await Todo.destroy({ where: { id: args.id } });
            if (result) {
                return `Todo with ID ${args.id} deleted successfully`;
            }
            throw new Error("Todo not found");
        }
    }
};
```