import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AdSense from 'react-adsense';

import Header from '../styles/Header';
import NavBar from '../components/NavBar';

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
  justify-content: center;
`;

const HopImage = styled.div`
  display: flex;
  justify-content: center;
  img {
    margin: 20px;
    width: 600px;
  }
`;

const Index = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <AdSense.Google
        client="ca-pub-6513320241703770"
        slot="9365940470"
        style={{ width: 160, height: 600, float: 'left' }}
      />
      <HopImage>
        <img src="/StarHop.jpg" />
      </HopImage>
      <ButtonDiv>
        <Link href="/HopSelection">
          <a>Get Started!</a>
        </Link>
      </ButtonDiv>
    </div>
  );
};

export default Index;
