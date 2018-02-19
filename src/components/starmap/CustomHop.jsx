import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import style from './CustomHop.scss';

export default class CustomHop extends Component {
  componentDidMount() {
    ReactGA.initialize('UA-114082743-1');
  }

  updateStartRA = e => {
    let ra = e.target.value;
    let newHop = { ...this.props.customHop };
    newHop.startingLocation.ra = ra;
    ReactGA.event({
      category: 'StarHop',
      action: 'Custom Hop',
      label: 'Data Entry startRA=' + ra,
    });
    this.props.customHopHandler(newHop);
  };

  updateStartDec = e => {
    let dec = e.target.value;
    let newHop = { ...this.props.customHop };
    newHop.startingLocation.dec = dec;

    ReactGA.event({
      category: 'StarHop',
      action: 'Custom Hop',
      label: 'Data Entry startDec=' + dec,
    });

    this.props.customHopHandler(newHop);
  };
  updateTargetRA = e => {
    let ra = e.target.value;
    let newHop = { ...this.props.customHop };
    newHop.targetLocation.ra = ra;

    ReactGA.event({
      category: 'StarHop',
      action: 'Custom Hop',
      label: 'Data Entry targetRA=' + ra,
    });
    this.props.customHopHandler(newHop);
  };
  updateTargetDec = e => {
    let dec = e.target.value;
    let newHop = { ...this.props.customHop };
    newHop.targetLocation.dec = dec;

    ReactGA.event({
      category: 'StarHop',
      action: 'Custom Hop',
      label: 'Data Entry targetDec=' + dec,
    });
    this.props.customHopHandler(newHop);
  };

  finalChange = () => {
    let newHop = { ...this.props.customHop };

    newHop.startingLocation.ra = Number(newHop.startingLocation.ra);
    newHop.startingLocation.dec = Number(newHop.startingLocation.dec);
    newHop.targetLocation.ra = Number(newHop.targetLocation.ra);
    newHop.targetLocation.dec = Number(newHop.targetLocation.dec);
    this.props.customHopHandler(newHop);
  };

  render() {
    return (
      <fieldset className="starhop-hop-customhop">
        <legend>Custom Hop</legend>
        <span>Starting Location</span>
        <span className="starhop-hop-customhop__input">
          <label style={{ width: 50 }}>RA:</label>
          <input
            style={{ width: 50 }}
            type="text"
            value={this.props.customHop.startingLocation.ra}
            onChange={this.updateStartRA}
            onBlur={this.finalChange}
          />
        </span>
        <span className="starhop-hop-customhop__input">
          <label style={{ width: 50 }}>Dec:</label>
          <input
            style={{ width: 50 }}
            type="text"
            value={this.props.customHop.startingLocation.dec}
            onChange={this.updateStartDec}
            onBlur={this.finalChange}
          />
        </span>
        <span>Target Location</span>
        <span className="starhop-hop-customhop__input">
          <label style={{ width: 50 }}>RA:</label>
          <input
            style={{ width: 50 }}
            type="text"
            value={this.props.customHop.targetLocation.ra}
            onChange={this.updateTargetRA}
            onBlur={this.finalChange}
          />
        </span>
        <span className="starhop-hop-customhop__input">
          <label style={{ width: 50 }}>Dec:</label>
          <input
            style={{ width: 50 }}
            type="text"
            value={this.props.customHop.targetLocation.dec}
            onChange={this.updateTargetDec}
            onBlur={this.finalChange}
          />
        </span>
      </fieldset>
    );
  }
}

CustomHop.propTypes = {
  customHop: PropTypes.object,
  customHopHandler: PropTypes.func.isRequired,
};
