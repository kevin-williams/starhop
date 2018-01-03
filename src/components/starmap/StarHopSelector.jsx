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
          options={this.props.hops}
          placeholder="Select Hop..."
        />
        <Select
          name="star-selector"
          value={this.props.selectedStar}
          onChange={this.props.starHandler}
          options={this.props.stars}
          placeholder="Select Starting Star"
        />
        <p className="starhop-hop-selector__description">{this.props.description}</p>
      </div>
    );
  }
}

StarHopSelector.propTypes = {
  hops: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  stars: PropTypes.array.isRequired,
  starHandler: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
  selectedStar: PropTypes.string.isRequired,
};
