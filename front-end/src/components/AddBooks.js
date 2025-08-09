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
    const [ addBook, { loading, error }] = useMutation(ADD_BOOK_MUTATION);
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({ variables: { name, genre, authorId } });
        setName('');
        setGenre('');
        setAuthorId('');
    }

    if (authorsLoading) return <p>Loading...</p>;
    if (authorsError) return <p>Error: {authorsError.message}</p>;

    console.log(authorsData);

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    {authorsData.authors.map((author) => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">+</button>    
            
        </form> 
    )

}