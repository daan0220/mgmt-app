import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/Clients';
import Projects from './components/Projects';
import AddClientModal from './components/AddClientModal';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='containar'>
            <AddClientModal/>
            <Projects />
            <Clients />
          </div>
          </Router>
      </ApolloProvider>
    </>
  );
}

export default App;