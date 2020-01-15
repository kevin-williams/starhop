import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { globals, theme } from '../styles/defaults';

const GlobalStyle = createGlobalStyle`${globals}`;

const App = ({ Component }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component />
  </ThemeProvider>
);
export default App;
