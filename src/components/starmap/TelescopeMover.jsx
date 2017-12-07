import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import PropTypes from 'prop-types';

import style from './TelescopeMover.scss';

export default class TelescopeMover extends Component {
  render() {
    return (
      <ReactCursorPosition>
        <p>{this.props.description}</p>
      </ReactCursorPosition>
    );
  }
}

TelescopeMover.propTypes = {
  handler: PropTypes.func.isRequired,
};
