import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AdSense from 'react-adsense';

import Header from '../styles/Header';

const MainDiv = styled.div`
  margin: 30px;
  color: ${({ theme }) => theme.headerWhite};

  h2 {
    color: ${({ theme }) => theme.blue};
  }

  p {
    font-size: 2rem;
  }

  button {
    color: ${({ theme }) => theme.white};
    padding: 10px;
    margin: 30px;
    align-self: center;
  }

  div {
    display: flex;
    justify-content: center;
  }
`;

const About = () => {
  return (
    <MainDiv>
      <Header />
      <h1>Starhop</h1>
      <AdSense.Google client="ca-pub-6513320241703770" slot="9365940470" />
      <h2>Purpose</h2>
      <p>
        I built this tool to help telescope users without computer assistance
        learn how to point their telescopes at a chosen target. This skill is
        not an easy one and if you are stuck under cloudy skies and finally get
        a clear night it can be very frustrating trying to learn on the spot!
      </p>

      <h2>Getting Started</h2>
      <p>
        The different hops included with this program having varying degrees of
        difficulty. Choose easy ones at first to help you get your bearings and
        learn how to move the scope to match what's on your charts.
      </p>

      <p>
        There are quite a few DSOs (Deep Space Objects) that are close to a
        bright star. These are the easiest hops as the starting star is easier
        to find in the sky and the amount you have to move the scope from the
        starting star is relatively small.
      </p>

      <h2>Note</h2>
      <p>
        I intentionally do not include star charts in this program. One of the
        skills is learning how to find your target in your star chart and then
        align it with what you are seeing in the sky.
      </p>

      <div>
        <Link href="/HopSelection">
          <a>Get Started!</a>
        </Link>
      </div>
    </MainDiv>
  );
};

export default About;
