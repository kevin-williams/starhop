export const theme = {
  maxHeight: '1920px',
  maxWidth: '1080px',

  disabledGrey: '#C9C9C9',
  disabledWhite: '#e2e2e2',
  disabledRed: 'rgba(237,28,36, .5)',

  black: '#393939',
  superBlack: '#000000',
  lightGrey: '#ececec',
  kioskGrey: '#838282',
  grey: '#3a3a3a',
  darkishGrey: '#979797',
  darkGrey: '#999999',
  darkestGrey: '#333333',

  white: '#ffffff',
  offWhite: '#ededed',
  headerWhite: '#f8f8f8',

  red: '#ed1c24',
  blue: '#3483DE'
};

export const globals = `

  html{
    margin: 30px;
    box-sizing: border-box;
    font-size: 10px;
    color: ${theme.offWhite};
    background-color: ${theme.grey};
    -webkit-tap-highlight-color: transparent;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: ${theme.fontRegular};
  }

  a {
    text-decoration: none;
    color: ${theme.blue};
    font-size: 2rem;
    background-color: ${theme.disabledGrey};
    padding: 10px;
    border-radius: 5px;
    text-transform: uppercase;
  }

  a:hover {
      background-color: ${theme.lightGrey};
      cursor: pointer;
  }

  button {
    outline: none;
    background-color: transparent;
  }

`;
