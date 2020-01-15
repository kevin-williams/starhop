import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import style from './ScopeTypeSelector.scss';

const SCOPE_TYPES = [
  { value: 'Correct Image', label: 'Correct Image' },
  { value: 'Refractor', label: 'Refractor' },
  { value: 'SCT', label: 'SCT' },
  { value: 'Dobsonian', label: 'Dobsonian' },
];

export default class ScopeTypeSelector extends Component {
  render() {
    return (
      <Select
        className="starhop-scope-selector"
        name="scope-selector"
        value={this.props.view.scopeType}
        onChange={this.props.handler}
        options={SCOPE_TYPES}
        placeholder="Select Scope..."
      />
    );
  }
}

ScopeTypeSelector.propTypes = {
  view: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};
