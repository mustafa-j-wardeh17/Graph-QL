import { gql } from '@apollo/client'

export const GET_TODOS = gql`
{
    getTodos{
        id
        title
        description
        complete
        date
    }
}
`
export const GET_SEARCH_TODOS = gql`
  query getSearchTodos($search: String, $page:Number) {
    getSearchTodos(search: $search, page:$page) {
      todos{
        id
        title
        description
        complete
        date
      }
      totalTodos
    }
  }
`;