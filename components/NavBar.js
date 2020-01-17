import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AdSense from 'react-adsense';

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-width: 0px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.offWhite};
  border-style: solid;
  background-image: url('banner.png');
  background-size: cover;
`;

const Title = styled.span`
  font-size: 4rem;
`;

const NavBar = () => {
  const router = useRouter();

  const pageTitle =
    router.pathname !== '/'
      ? `${router.pathname.replace(/\//, '').replace(/(\w+)([A-Z])/, '$1 $2')}`
      : 'Star Hop';

  return (
    <NavigationBar>
      <Title>{pageTitle}</Title>
      <Link href="/About">
        <button>About</button>
      </Link>
    </NavigationBar>
  );
};

export default NavBar;
