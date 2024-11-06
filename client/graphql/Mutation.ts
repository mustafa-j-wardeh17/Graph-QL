import { gql } from "@apollo/client";


// Mutation to delete a todo
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
// Mutation to add a todo
export const ADD_TODO = gql`
  mutation AddTodo($title:String,$description:String,$date:Date,$complete:Boolean) {
    addTodo(title: $title,description: $description,date: $date,complete: $complete,){
            id
            title
            description
            date
            complete
        }
  }
`;