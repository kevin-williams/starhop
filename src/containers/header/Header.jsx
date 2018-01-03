import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div className="starhop-header">
        <span className="starhop-header__title">StarHop Trainer {version}</span>
        <SkyDarkness value={this.props.starhop.skyDarkness} handler={this.handleSkyDarkness} />
        <a href="https://paypal.me/KevinWilliamsDev" className="starhop-link" target="_blank">
          Donate if you enjoy this app!
        </a>
      </div>
    );
  }
}
