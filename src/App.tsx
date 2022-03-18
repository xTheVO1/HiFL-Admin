import GlobalStyles from "./styles/GlobalStyles"
import { ThemeProvider } from 'styled-components'
import { useTheme } from './hooks/theme'
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from "./routes/routes";

import './App.css';

function App() {
  const { theme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyles />
      <Routes/>
   </ThemeProvider>
  );
}

export default App;
