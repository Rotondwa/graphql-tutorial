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
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error.message}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-medium">Books</h2>
      <ul className="space-y-2">
        {data.books.map((book) => (
          <li
            key={book.id}
            className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
          >
            <span className="truncate font-medium">{book.name}</span>
            <span className="ml-3 shrink-0 rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {book.genre}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

