import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-width: 0px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.offWhite};
  border-style: solid;
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

  console.log('pageTitle1', pageTitle);

  return (
    <NavigationBar>
      <Title>{pageTitle}</Title>
      <Link href="/About">
        <a>About</a>
      </Link>
    </NavigationBar>
  );
};

export default NavBar;
