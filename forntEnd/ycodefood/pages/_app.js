import '../styles/globals.css'
import Navbar from "../components/Navbar";
import { refreshToken } from '../helpers/auth/token';
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../context/Context";
import { ContextProvider } from '../context/Context'


//react query imports
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  //fetching all roles

  useEffect(() => {
    refreshToken();
  }, []);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer />
        </ContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default MyApp
