import React, { Component } from 'react';
import { connect } from 'react-redux';

import { version } from '../../../package.json';

import styles from './Header.scss';

const mapStateToProps = state => state;

@connect(mapStateToProps)
export default class Header extends Component {
  render() {
    return (
      <div className="starhop-header">
        <span className="starhop-header__title">StarHop Trainer {version}</span>{' '}
        <a href="https://paypal.me/KevinWilliamsDev" className="starhop-link" target="_blank">
          Donate if you enjoy this app!
        </a>
      </div>
    );
  }
}
