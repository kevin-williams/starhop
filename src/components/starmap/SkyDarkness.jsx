import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import style from './SkyDarkness.scss';

const marks = {
  0: {
    style: {
      color: 'lightgrey',
    },
    label: <strong>Rural</strong>,
  },
  26: {
    style: {
      color: 'lightblue',
    },
    label: <strong>Outer Suburb</strong>,
  },
  50: {
    style: {
      color: 'lightgreen',
    },
    label: <strong>Suburb</strong>,
  },
  75: {
    style: {
      color: 'yellow',
    },
    label: <strong>Outer City</strong>,
  },
  100: {
    style: {
      color: 'red',
    },
    label: <strong>City</strong>,
  },
};

export default class SkyDarkness extends Component {
  render() {
    // return <Slider value={this.props.value} onChange={this.props.handler} />;
    return (
      <div className="starhop-sky-darkness">
        <Slider marks={marks} value={this.props.value} onChange={this.props.handler} />
      </div>
    );
  }
}

SkyDarkness.propTypes = {
  value: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};
