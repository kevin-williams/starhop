import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

import style from './StarHopSelector.scss';

export default class StarHopSelector extends Component {
  render() {
    return (
      <div className="starhop-hop-selector">
        <Select
          name="hop-selector"
          value={this.props.selectedItem}
          onChange={this.props.handler}
          options={this.props.items}
          placeholder="Select Hop..."
        />
        <p className="starhop-hop-selector__description">{this.props.description}</p>
      </div>
    );
  }
}

StarHopSelector.propTypes = {
  items: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
};
