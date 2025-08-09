import BookList from './components/BookList';
import AddBooks from './components/AddBooks';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBooks />
      </div>
    </ApolloProvider>
  );
}

export default App;
