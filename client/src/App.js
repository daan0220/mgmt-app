import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

// アプリケーションが効率的に動作し、データが正しく更新されるために重要な部分
// Apollo Clientはキャッシュを使用して、GraphQLクエリの結果を一時的に保存し、再利用できるようにする
const cache = new InMemoryCache({
  // データの統合（マージ）方法を指定するために使用
  typePolicies: {
    Query: {
      fields: {
        // existingは既存のキャッシュ内のデータで、incomingは新しく取得したデータ。新しいデータが受信された場合、古いデータ（existing）は置き換えられる
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

// エントリーポイントとなるコンポーネント
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;