import Head from 'next/head';
import pkg from '../package.json';

import GATag from '../components/GATag';

const Header = () => (
  <Head>
    <GATag />
    <title>Starhop {pkg.version}</title>
  </Head>
);

export default Header;
