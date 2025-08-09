import React from 'react';
import { useQuery, gql } from '@apollo/client';

// construct a query to get all books
const GET_BOOKS_QUERY = gql`
    {
    books {
        id
        name
        genre
    }
}
`
export default function BookList() {

    //console log the data
    const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    
    return (
        <div className="book-list">
            <h2>Book List</h2>

            <ul>
                {data.books.map((book) => (

                    <li> {book.name} </li>
                ))}
          
            </ul>
        </div>
    )
}

