import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import style from './ScopeMagnificationSelector.scss';

const MAGNIFICATIONS = [
  { value: 1.5, label: 'Low (1.5° FOV)' },
  { value: 1, label: 'Medium (1°Fov)' },
  { value: 0.5, label: 'High (0.5° FOV)' },
];

export default class ScopeMagnificationSelector extends Component {
  render() {
    return (
      <Select
        className="starhop-mag-selector"
        name="scope-mag-selector"
        value={this.props.view.fov}
        onChange={this.props.handler}
        options={MAGNIFICATIONS}
        placeholder="Select Magnification..."
      />
    );
  }
}

ScopeMagnificationSelector.propTypes = {
  view: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};
