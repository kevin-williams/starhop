import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorLine from '../../components/error/ErrorLine';
import ScopeTypeButton from '../../components/starmap/ScopeTypeButton';
import StarMap from '../../components/starmap/StarMap';
import { getStars, updateEyepieceView } from './starHopActions';

import styles from './StarHop.scss';

const ORION_QUERY = {
  raFrom: 4.5,
  raTo: 6.5,
  decFrom: -15,
  decTo: 15,
  magLimit: 15,
};

const PLEIADES_QUERY = {
  raFrom: 3.3,
  raTo: 4.3,
  decFrom: 21,
  decTo: 27,
  magLimit: 15,
};

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps, { getStars, updateEyepieceView })
export default class StarHop extends Component {
  handleScopeType = e => {
    let scopeType = e.target.value;
    console.log('Change scopeType=' + scopeType);

    let newView = this.props.starhop.eyepieceView;
    newView.scopeType = scopeType;

    this.props.updateEyepieceView(newView);
  };

  moveUp = e => {
    let newEyepieceView = this.props.starhop.eyepieceView;
    let newView = this.props.starhop.view;
    newEyepieceView.dec = newEyepieceView.dec + 0.1;
    newView.dec = newEyepieceView.dec;
    console.log('showing new view=', newEyepieceView);
    this.props.updateEyepieceView(newEyepieceView);
    this.props.updateView(newView);
  };

  moveDown = e => {
    let newEyepieceView = this.props.starhop.eyepieceView;
    let newView = this.props.starhop.view;
    newEyepieceView.dec = newEyepieceView.dec - 0.1;
    newView.dec = newEyepieceView.dec;
    console.log('showing new view=', newEyepieceView);
    this.props.updateEyepieceView(newEyepieceView);
    this.props.updateView(newView);
  };

  moveRight = e => {
    let newEyepieceView = this.props.starhop.eyepieceView;
    let newView = this.props.starhop.view;
    newEyepieceView.ra = newEyepieceView.ra - 0.007;
    newView.ra = newEyepieceView.ra;
    console.log('showing new view=', newEyepieceView);
    this.props.updateEyepieceView(newEyepieceView);
    this.props.updateView(newView);
  };

  moveLeft = e => {
    let newEyepieceView = this.props.starhop.eyepieceView;
    let newView = this.props.starhop.view;
    newEyepieceView.ra = newEyepieceView.ra + 0.007;
    newView.ra = newEyepieceView.ra;
    console.log('showing new view=', newEyepieceView);
    this.props.updateEyepieceView(newEyepieceView);
    this.props.updateView(newView);
  };

  render() {
    return (
      <div>
        <div className="starhop-hopview">
          <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />
          <StarMap stars={this.props.starhop.stars} view={this.props.starhop.view} />
          <div>
            <StarMap stars={this.props.starhop.stars} view={this.props.starhop.eyepieceView} />
            <div className="starhop-hopview__arrows">
              <div className="starhop-hopview__arrows__row">
                <button onClick={this.moveUp}>^</button>
              </div>
              <div className="starhop-hopview__arrows__row">
                <button onClick={this.moveLeft}>&lt;</button>
                <button onClick={this.moveRight}>&gt;</button>
              </div>
              <div className="starhop-hopview__arrows__row">
                <button onClick={this.moveDown}>v</button>
              </div>
            </div>
          </div>
          <div className="starhop-hopview__scopetype">
            <ScopeTypeButton
              label="Correct Image"
              view={this.props.starhop.eyepieceView}
              handler={this.handleScopeType}
            />
            <ScopeTypeButton label="Refractor" view={this.props.starhop.eyepieceView} handler={this.handleScopeType} />
            <ScopeTypeButton label="SCT" view={this.props.starhop.eyepieceView} handler={this.handleScopeType} />
            <ScopeTypeButton label="Dobsonian" view={this.props.starhop.eyepieceView} handler={this.handleScopeType} />
          </div>
        </div>
        <div>
          <button onClick={() => this.props.getStars(PLEIADES_QUERY)}>Load</button>
          <button onClick={() => this.props.history.goBack()}>Back</button>
        </div>
      </div>
    );
  }
}
