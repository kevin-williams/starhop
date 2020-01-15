import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { globals, theme } from '../styles/defaults';
import client from '../utils/apolloClient';

const GlobalStyle = createGlobalStyle`${globals}`;

const App = ({ Component }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component />
    </ThemeProvider>
  </ApolloProvider>
);
export default App;
