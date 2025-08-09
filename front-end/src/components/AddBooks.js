import { useMutation, gql, useQuery } from '@apollo/client';
import { useState } from 'react';


const GET_AUTHORS_QUERY = gql`
{
    authors {
        name
        id
    }
}
`
const ADD_BOOK_MUTATION = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`

export default function AddBooks() {
  const [addBook, { loading, error }] = useMutation(ADD_BOOK_MUTATION);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS_QUERY);

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !genre || !authorId) return;
    addBook({ variables: { name, genre, authorId } });
    setName('');
    setGenre('');
    setAuthorId('');
  };

  if (authorsLoading) return <p className="text-sm text-gray-500">Loading authors...</p>;
  if (authorsError) return <p className="text-sm text-red-600">Error: {authorsError.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Add a new book">
      <div className="space-y-1">
        <label htmlFor="book-name" className="block text-sm font-medium text-gray-700">
          Book name
        </label>
        <input
          id="book-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
          placeholder="e.g. The Alchemist"
          aria-label="Book name"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="book-genre" className="block text-sm font-medium text-gray-700">
          Genre
        </label>
        <input
          id="book-genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
          placeholder="e.g. Fantasy"
          aria-label="Book genre"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="book-author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <select
          id="book-author"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
          aria-label="Select author"
        >
          <option value="" disabled>
            Select an author
          </option>
          {authorsData.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!name || !genre || !authorId}
          aria-label="Add book"
        >
          Add Book
        </button>
      </div>
    </form>
  );
}