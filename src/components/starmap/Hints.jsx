import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';

import { RA_TO_DEG } from 'utils';

import style from './Hints.scss';

export default class Hints extends Component {
  toggleLocation = () => {
    let myHints = { ...this.props.hints };
    myHints.currentLocation = !myHints.currentLocation;

    this.props.updateHints(myHints);
  };

  toggleArrow = () => {
    let myHints = { ...this.props.hints };
    myHints.directionArrow = !myHints.directionArrow;

    this.props.updateHints(myHints);
  };

  render() {
    return (
      <div className="starhop-hop-hints">
        <ToggleButton value={this.props.hints.currentLocation} onToggle={this.toggleLocation} activeLabel="Loc" />
        <ToggleButton
          value={this.props.hints.directionArrow}
          onToggle={this.toggleArrow}
          activeLabel="->"
          inactiveLabel="->"
        />
      </div>
    );
  }
}

// hints: {
//   directionArrow: true,
//     currentLocation: true,
//     hintText: true,
// },

Hints.propTypes = {
  hints: PropTypes.object.isRequired,
  updateHints: PropTypes.func.isRequired,
};
