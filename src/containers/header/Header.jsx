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
        <div className="starhop-header__title">StarHop Trainer {version}</div>
      </div>
    );
  }
}
