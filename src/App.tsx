import GlobalStyles from "./styles/GlobalStyles"
import { ThemeProvider } from 'styled-components'
import { useTheme } from './hooks/theme'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./routes/routes";

import './App.css';

function App() {
  const { theme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyles />
      <Routes/>
      <ToastContainer newestOnTop />
   </ThemeProvider>
  );
}

export default App;
