import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './SkyDarkness.scss';

export default class SkyDarkness extends Component {
  render() {
    // return <Slider value={this.props.value} onChange={this.props.handler} />;
    return (
      <div className="starhop-sky-darkness">
        <label htmlFor="darkness">Sky Darkness</label>
        <input
          type="range"
          name="darkness"
          id="darkness"
          min="0"
          max="100"
          value={this.props.value}
          onChange={this.props.handler}
        />
      </div>
    );
  }
}

SkyDarkness.propTypes = {
  value: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};
