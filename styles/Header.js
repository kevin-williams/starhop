import Head from 'next/head';
import pkg from '../package.json';

const Header = () => (
  <Head>
    <title>Starhop {pkg.version}</title>
  </Head>
);

export default Header;
