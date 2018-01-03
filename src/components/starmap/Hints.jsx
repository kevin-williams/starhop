import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';
import Text from 'react-format-text';

import { RA_TO_DEG } from 'utils';

import style from './Hints.scss';

export default class Hints extends Component {
  toggleProgress = () => {
    let myHints = { ...this.props.hints };
    myHints.showProgress = !myHints.showProgress;

    this.props.updateHints(myHints);
  };

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

  toggleHintText = () => {
    let myHints = { ...this.props.hints };
    myHints.hintText = !myHints.hintText;

    this.props.updateHints(myHints);
  };

  render() {
    let hint = null;
    if (this.props.hints.hintText && this.props.starhop.hint) {
      let hintText =
        'Line up your star chart with the stars in the finder or naked eye view to get your orientation and get the angle correct.\n\n' +
        this.props.starhop.hint;
      hint = <Text>{hintText}</Text>;
    }

    return (
      <fieldset className="starhop-hop-hints">
        <legend>Hints</legend>
        <span>Progress</span>
        <ToggleButton value={this.props.hints.showProgress} onToggle={this.toggleProgress} />
        <span>Location</span>
        <ToggleButton value={this.props.hints.currentLocation} onToggle={this.toggleLocation} />
        <span>Arrow</span>
        <ToggleButton value={this.props.hints.directionArrow} onToggle={this.toggleArrow} />
        <span>Hint</span>
        <ToggleButton value={this.props.hints.hintText} onToggle={this.toggleHintText} />
        {hint}
      </fieldset>
    );
  }
}

Hints.propTypes = {
  starhop: PropTypes.object.isRequired,
  hints: PropTypes.object.isRequired,
  updateHints: PropTypes.func.isRequired,
};
