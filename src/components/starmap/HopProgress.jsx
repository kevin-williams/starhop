import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RA_TO_DEG } from 'utils';

export default class HopProgress extends Component {
  render() {
    let { location, start, target } = this.props;

    if (location.ra < 0) {
      return null;
    }

    let targetRADiff = Math.abs((start.ra - target.ra) / RA_TO_DEG);
    let targetDecDiff = Math.abs(start.dec - target.dec);

    let raDiff = Math.abs((location.ra - target.ra) / RA_TO_DEG);
    let decDiff = Math.abs(location.dec - target.dec);

    // Draw Arrow
    let progress = (targetRADiff + targetDecDiff - raDiff - decDiff) / (targetRADiff + targetDecDiff) * 100 + 5;

    // console.log(`progress= ${progress}   raDiff=${raDiff} decDiff=${decDiff}`);

    let meterStyle = {
      width: '100%',
      height: 20,
    };

    return <meter min="0" low="50" high="90" optimum="95" max="100" value={progress} style={meterStyle} />;
  }
}

HopProgress.propTypes = {
  location: PropTypes.object.isRequired,
  start: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};
