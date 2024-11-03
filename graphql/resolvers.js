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
        }
    }
}