import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { AuthProvider } from './Contexts/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './Contexts/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import LoadingScreen from './components/Loader/LoadingScreen.jsx';
import { lazy } from 'react';

const App = lazy(() => import('./App.jsx'));

const client = new ApolloClient({
  // uri: 'http://localhost:8000/graphql',
  uri: import.meta.env.VITE_API_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <AuthProvider>
  <PersistGate loading={null} persistor={persistor}>
  <ApolloProvider client={client}>
      
      <Suspense fallback={<LoadingScreen/>}>
      <App />
      </Suspense>
      {/* <LoadingScreen/> */}
  </ApolloProvider>
  </PersistGate>
  </AuthProvider>
  </Provider>
  </React.StrictMode>
  ,
)
