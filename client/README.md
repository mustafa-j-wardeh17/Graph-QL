# React Frontend with Apollo Client and GraphQL

This project demonstrates how to set up a React frontend that communicates with an Express backend using GraphQL and Apollo Client. The React app allows you to fetch and manipulate data through GraphQL queries and mutations.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn (for managing dependencies)

Also, ensure that you have a GraphQL backend (e.g., Express server with GraphQL) running at `http://localhost:5000/graphql`.

---

## Steps to Set Up the React Frontend (example)

### 1. Install Dependencies

First, create a React app if you haven't already, and install the necessary dependencies.

1. **Create a new React app** (if you haven't already):

    ```bash
    npx create-react-app frontend
    ```

2. **Navigate to the project folder** and install Apollo Client and GraphQL:

    ```bash
    cd frontend
    npm install @apollo/client graphql
    ```

---

### 2. Set Up Apollo Client

To interact with the GraphQL server, we need to configure Apollo Client.

1. **Create `src/apolloClient.js`** to configure Apollo Client:

    ```js
    // src/apolloClient.js
    import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

    const client = new ApolloClient({
      uri: 'http://localhost:5000/graphql', // URL of your Express GraphQL server
      cache: new InMemoryCache(),
    });

    export default client;
    ```

---

### 3. Wrap Your App with ApolloProvider

In order to use Apollo Client across your entire React app, wrap your `App` component with `ApolloProvider`.

1. **Update `src/index.js`** to wrap the `App` component with `ApolloProvider`:

    ```js
    // src/index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import { ApolloProvider } from '@apollo/client';
    import client from './apolloClient';

    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById('root')
    );
    ```

---

### 4. Create GraphQL Queries

Define GraphQL queries that will be used to fetch data from the server.

1. **Create `src/graphql/queries.js`**:

    ```js
    // src/graphql/queries.js
    import { gql } from '@apollo/client';

    // Query to get all users
    export const GET_USERS = gql`
      query GetUsers {
        users {
          id
          name
          email
          age
        }
      }
    `;
    ```

---

### 5. Create GraphQL Mutations

Define the mutations for adding new users to the server.

1. **Create `src/graphql/mutations.js`**:

    ```js
    // src/graphql/mutations.js
    import { gql } from '@apollo/client';

    // Mutation to add a new user
    export const ADD_USER = gql`
      mutation AddUser($name: String!, $email: String!, $age: Int) {
        addUser(name: $name, email: $email, age: $age) {
          id
          name
          email
          age
        }
      }
    `;
    ```

---

### 6. Fetch Data with Queries in React Components

Now, use the `useQuery` hook to fetch data from the GraphQL API inside your React components.

1. **Create `src/components/UsersList.js`** to display the list of users:

    ```js
    // src/components/UsersList.js
    import React from 'react';
    import { useQuery } from '@apollo/client';
    import { GET_USERS } from '../graphql/queries';

    const UsersList = () => {
      const { loading, error, data } = useQuery(GET_USERS);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <div>
          <h2>Users</h2>
          <ul>
            {data.users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email} - {user.age}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default UsersList;
    ```

---

### 7. Create Form for Mutations

Use the `useMutation` hook to send data to the server and add new users.

1. **Create `src/components/AddUserForm.js`** for the user input form:

    ```js
    // src/components/AddUserForm.js
    import React, { useState } from 'react';
    import { useMutation } from '@apollo/client';
    import { ADD_USER } from '../graphql/mutations';

    const AddUserForm = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [age, setAge] = useState('');
      const [addUser] = useMutation(ADD_USER);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await addUser({
            variables: { name, email, age: parseInt(age, 10) },
          });
          setName('');
          setEmail('');
          setAge('');
        } catch (err) {
          console.error('Error adding user', err);
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button type="submit">Add User</button>
        </form>
      );
    };

    export default AddUserForm;
    ```

---

### 8. Integrate Components in `App.js`

Finally, integrate both the `UsersList` and `AddUserForm` components into your main `App.js`.

1. **Update `src/App.js`**:

    ```js
    // src/App.js
    import React from 'react';
    import UsersList from './components/UsersList';
    import AddUserForm from './components/AddUserForm';

    const App = () => {
      return (
        <div>
          <h1>React & GraphQL with Apollo Client</h1>
          <AddUserForm />
          <UsersList />
        </div>
      );
    };

    export default App;
    ```

---

### 9. Run the React Application

Once you have completed all the steps, you can run the React development server.

1. **Start the development server**:

    ```bash
    npm start
    ```

2. The app will be available at `http://localhost:3000`, and you should be able to interact with the API.


---

## Conclusion

In this tutorial, you've learned how to:

- Set up Apollo Client in a React app.
- Fetch data from a GraphQL API using `useQuery` hook.
- Send data to the server using `useMutation` hook.
- Create a form to add new users and display a list of existing users.

This basic setup can now be extended further for more complex applications using GraphQL and Apollo Client with React.




