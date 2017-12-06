import React, { Component } from 'react';
import { connect } from 'react-redux';

const hopData = require('../../../public/db/hopData.json');

import ErrorLine from '../../components/error/ErrorLine';
import ScopeTypeSelector from '../../components/starmap/ScopeTypeSelector';
import StarHopSelector from '../../components/starmap/StarHopSelector';
import StarMap from '../../components/starmap/StarMap';
import { getStars, getDeepSpaceObjects, updateView, updateEyepieceView, updateSelectedHop } from './starHopActions';

import styles from './StarHop.scss';

const finderView = {
  fov: 7,
  magLimit: 8,
  width: 600,
  height: 600,
};

const eyepieceView = {
  fov: 1.4,
  magLimit: 12,
  width: 300,
  height: 300,
  scopeType: 'Dobsonian',
};

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

const hopItems = [];

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps, { getStars, getDeepSpaceObjects, updateView, updateEyepieceView, updateSelectedHop })
export default class StarHop extends Component {
  componentDidMount() {
    console.log('starting load DSO action');
    this.props.getDeepSpaceObjects('M');

    Object.entries(hopData).map(entry => {
      console.log('hopData entry', entry);
      hopItems.push({ value: entry[0], label: entry[0] });
    });
  }

  loadHopData = hop => {
    const hopInfo = hopData[hop.value];

    this.props.updateSelectedHop(hopInfo);

    this.props.getStars(hopInfo.starMapQuery);
    const myFinderView = {
      ...finderView,
      ra: hopInfo.startingLocation.ra,
      dec: hopInfo.startingLocation.dec,
    };
    console.log('myFinderView', myFinderView);
    this.props.updateView(myFinderView);

    const myEyepieceView = {
      ...eyepieceView,
      ra: hopInfo.startingLocation.ra,
      dec: hopInfo.startingLocation.dec,
    };
    console.log('myEyepieceView', myEyepieceView);
    this.props.updateEyepieceView(myEyepieceView);
  };

  handleScopeType = e => {
    console.log('Change scopeType=', e);
    let scopeType = e.value;

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
    console.log('selectedHop=', this.props.starhop.selectedHop);

    return (
      <div>
        <div className="starhop-hopview">
          <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />
          <StarMap stars={this.props.starhop.stars} view={this.props.starhop.view} dsos={this.props.starhop.dsos} />
          <div>
            <ScopeTypeSelector view={this.props.starhop.eyepieceView} handler={this.handleScopeType} />
            <StarMap
              stars={this.props.starhop.stars}
              view={this.props.starhop.eyepieceView}
              dsos={this.props.starhop.dsos}
            />
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
            <div>
              <StarHopSelector
                selectedItem={this.props.starhop.selectedHop.id}
                items={hopItems}
                handler={this.loadHopData}
                description={this.props.starhop.selectedHop.description}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
