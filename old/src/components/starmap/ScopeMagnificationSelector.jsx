import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import style from './ScopeMagnificationSelector.scss';

export default class ScopeMagnificationSelector extends Component {
  render() {
    return (
      <Select
        className="starhop-mag-selector"
        name="scope-mag-selector"
        value={this.props.view.fov}
        onChange={this.props.handler}
        options={this.props.magnifications}
        placeholder="Select Magnification..."
      />
    );
  }
}

ScopeMagnificationSelector.propTypes = {
  view: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  magnifications: PropTypes.array.isRequired,
};
