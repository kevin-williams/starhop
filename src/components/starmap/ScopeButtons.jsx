import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import style from './ScopeButtons.scss';

const TIMEOUT = 100;

const SPEED = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }];

export default class ScopeButtons extends Component {
  state = {
    speed: SPEED[0].value,
    moving: false,
    axis: 'ra',
    direction: '+',
  };

  changeSpeed = e => {
    let speed = e.value;
    this.setState({ speed });
  };

  onStartMove = (axis, direction) => {
    // console.log(`onStartMove ${axis} ${direction}`);
    this.setState({ moving: true, axis, direction }, this.keepMoving);
  };

  keepMoving = () => {
    const { axis, direction } = this.state;
    // console.log(`keepMoving ${axis} ${direction}`);
    this.move(axis, direction);
    if (this.state.moving) {
      setTimeout(this.keepMoving, TIMEOUT);
    }
  };

  onStopMove = () => {
    // console.log(`onStopMove`);
    this.setState({ moving: false });
  };

  move = (axis, direction) => {
    let newLocation = { ...this.props.location };
    // console.log(`move ${axis} ${direction}`, this.props.location);

    // let newLocation = this.props.starhop.eyepieceView;
    // newLocation.dec = newLocation.dec + 0.1;
    // this.props.updateEyepieceView(newLocation);

    if (axis === 'ra') {
      if (direction === '-') {
        newLocation.ra = newLocation.ra - 0.007 * this.state.speed;
      } else {
        newLocation.ra = newLocation.ra + 0.007 * this.state.speed;
      }
    } else {
      if (direction === '-') {
        newLocation.dec = newLocation.dec - 0.1 * this.state.speed;
      } else {
        newLocation.dec = newLocation.dec + 0.1 * this.state.speed;
      }
    }

    this.props.changeLocation(newLocation);
  };

  render() {
    return (
      <div className="starhop-hop-scope-buttons">
        <button
          className="starhop-hop-scope-buttons__up"
          onMouseDown={() => this.onStartMove('dec', '+')}
          onMouseUp={this.onStopMove}
          onMouseLeave={this.onStopMove}
        />
        <div className="starhop-hop-scope-buttons__center_row">
          <button
            className="starhop-hop-scope-buttons__left"
            onMouseDown={() => this.onStartMove('ra', '+')}
            onMouseUp={this.onStopMove}
            onMouseLeave={this.onStopMove}
          />
          <Select
            className="starhop-hop-scope-buttons__speed_select"
            name="scope-selector"
            value={this.state.speed}
            onChange={this.changeSpeed}
            options={SPEED}
            placeholder="Speed..."
            clearable={false}
          />
          <button
            className="starhop-hop-scope-buttons__right"
            onMouseDown={() => this.onStartMove('ra', '-')}
            onMouseUp={this.onStopMove}
            onMouseLeave={this.onStopMove}
          />
        </div>
        <button
          className="starhop-hop-scope-buttons__down"
          onMouseDown={() => this.onStartMove('dec', '-')}
          onMouseUp={this.onStopMove}
          onMouseLeave={this.onStopMove}
        />
      </div>
    );
  }
}

ScopeButtons.propTypes = {
  location: PropTypes.object.isRequired,
  changeLocation: PropTypes.func.isRequired,
};
