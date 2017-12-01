import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './ScopeTypeButton.scss';

export default class ScopeTypeButton extends Component {
  render() {
    return (
      <label className="starhop-scope-type-button">
        <input
          type="radio"
          value={this.props.label}
          checked={this.props.view.scopeType === this.props.label}
          onChange={this.props.handler}
        />
        {this.props.label}
      </label>
    );
  }
}

ScopeTypeButton.propTypes = {
  label: PropTypes.string.isRequired,
  view: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};
