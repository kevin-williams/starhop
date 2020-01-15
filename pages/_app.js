import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import ReactGA from 'react-ga';

import { globals, theme } from '../styles/defaults';
import client from '../utils/apolloClient';

const GlobalStyle = createGlobalStyle`${globals}`;

const App = ({ Component }) => {
  useEffect(() => {
    ReactGA.initialize('UA-114082743-1');
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component />
      </ThemeProvider>
    </ApolloProvider>
  );
};
export default App;
