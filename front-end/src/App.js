import BookList from './components/BookList';
import AddBooks from './components/AddBooks';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight">Reading List</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <BookList />
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <AddBooks />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
