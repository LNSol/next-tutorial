import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/* <NavBar /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* <span>Hello</span> */}
    </QueryClientProvider>
  );
};
export default MyApp;
