import React from 'react';
import Link from 'next/link';
import AdSense from 'react-adsense';
import { MdArrowBack } from 'react-icons/md';

import Header from '../styles/Header';

const StarHop = () => {
  return (
    <div>
      <Header />
      <AdSense.Google
        client="ca-pub-6513320241703770"
        slot="9365940470"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
      />
      <Link href="/HopSelection">
        <button>
          <MdArrowBack size={20} />
        </button>
      </Link>
      <div>Star Hop map and controls here</div>
    </div>
  );
};

export default StarHop;
