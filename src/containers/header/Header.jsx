import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdSense from 'react-adsense';

import { version } from '../../../package.json';
import { updateSkyDarkness } from '../starhop/starHopActions';

import styles from './Header.scss';
import SkyDarkness from '../../components/starmap/SkyDarkness';

const mapStateToProps = state => state;

@connect(mapStateToProps, {
  updateSkyDarkness,
})
export default class Header extends Component {
  handleSkyDarkness = e => {
    this.props.updateSkyDarkness(e);
  };

  render() {
    return (
      <div>
        <AdSense.Google client="ca-pub-6513320241703770" slot="9365940470" />
        <div className="starhop-header">
          <span className="starhop-header__title">StarHop Trainer {version}</span>
          <SkyDarkness value={this.props.starhop.skyDarkness} handler={this.handleSkyDarkness} />
        </div>
      </div>
    );
  }
}
