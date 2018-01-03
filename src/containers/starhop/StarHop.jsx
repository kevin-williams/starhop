import React, { Component, Link } from 'react';
import { connect } from 'react-redux';
import HopProgress from '../../components/starmap/HopProgress';
import SkyDarkness from '../../components/starmap/SkyDarkness';

const hopData = require('../../../public/db/hopData.json');

import ErrorLine from '../../components/error/ErrorLine';
import Hints from '../../components/starmap/Hints';
import ScopeButtons from '../../components/starmap/ScopeButtons';
import ScopeMagnificationSelector from '../../components/starmap/ScopeMagnificationSelector';
import ScopeTypeSelector from '../../components/starmap/ScopeTypeSelector';
import StarHopSelector from '../../components/starmap/StarHopSelector';
import StarMap from '../../components/starmap/StarMap';
import {
  getStars,
  getDeepSpaceObjects,
  updateHints,
  updateLocation,
  updateView,
  updateEyepieceView,
  updateSelectedHop,
} from './starHopActions';

import styles from './StarHop.scss';

const MAGNIFICATIONS = [
  { value: 1.5, label: 'Low (1.5° FOV)' },
  { value: 1, label: 'Medium (1°Fov)' },
  { value: 0.5, label: 'High (0.5° FOV)' },
];

const FINDER_MAGNIFICATIONS = [{ value: 7, label: 'Finder (7° FOV)' }, { value: 20, label: 'Naked Eye (20°Fov)' }];

const hopItems = [];

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps, {
  getStars,
  getDeepSpaceObjects,
  updateHints,
  updateLocation,
  updateView,
  updateEyepieceView,
  updateSelectedHop,
})
export default class StarHop extends Component {
  componentDidMount() {
    this.props.getDeepSpaceObjects('M');

    Object.entries(hopData).map(entry => {
      hopItems.push({ value: entry[0], label: entry[1].label });
    });
  }

  loadHopData = hop => {
    const hopInfo = hopData[hop.value];

    this.props.updateSelectedHop(hopInfo);

    this.props.getStars(hopInfo.starMapQuery);
    this.props.updateLocation(hopInfo.startingLocation[0]);
  };

  updateStartingStar = star => {
    console.log('updateStar=', star);

    this.props.starhop.selectedHop.startingLocation.map(location => {
      if (star.value == location.name) {
        let hopInfo = { ...this.props.starhop.selectedHop };
        hopInfo.selectedStar = location;
        this.props.updateSelectedHop(hopInfo);
        this.props.updateLocation(location);
      }
    });
  };

  handleScopeType = e => {
    // console.log('Change scopeType=', e);
    let scopeType = e.value;

    let newView = { ...this.props.starhop.eyepieceView };
    newView.scopeType = scopeType;

    this.props.updateEyepieceView(newView);
  };

  handleMagnification = e => {
    // console.log('Change scopeType=', e);
    let fov = e.value;

    let newView = { ...this.props.starhop.eyepieceView };
    newView.fov = fov;

    this.props.updateEyepieceView(newView);
  };

  handleFinderMagnification = e => {
    // console.log('Change scopeType=', e);
    let fov = e.value;

    let newView = { ...this.props.starhop.view };
    newView.fov = fov;
    newView.magLimit = fov == 7 ? 8 : 5.5;

    this.props.updateView(newView);
  };

  render() {
    let targetFound = this.props.starhop.targetFound ? (
      <div className="starhop-hopview__target-found">Target in Eyepiece View!</div>
    ) : null;

    // Add hints into only the finder view
    let finderView = { ...this.props.starhop.view };
    finderView.hints = this.props.starhop.hints;
    finderView.target = this.props.starhop.selectedHop.targetLocation;

    let hopStars = this.props.starhop.selectedHop.startingLocation.map(location => ({
      value: location.name,
      label: location.name,
    }));

    return (
      <div>
        <HopProgress
          visible={this.props.starhop.hints.showProgress}
          location={this.props.starhop.location}
          start={this.props.starhop.selectedHop.selectedStar}
          target={this.props.starhop.selectedHop.targetLocation}
        />
        <div className="starhop-hopview">
          <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />

          <div>
            <StarMap
              stars={this.props.starhop.stars}
              dsos={this.props.starhop.dsos}
              location={this.props.starhop.location}
              view={finderView}
              skyDarkness={this.props.starhop.skyDarkness}
              updateLocation={this.props.updateLocation}
            />
            <ScopeMagnificationSelector
              view={this.props.starhop.view}
              handler={this.handleFinderMagnification}
              magnifications={FINDER_MAGNIFICATIONS}
            />
          </div>
          <div>
            <ScopeTypeSelector view={this.props.starhop.eyepieceView} handler={this.handleScopeType} />
            <StarMap
              stars={this.props.starhop.stars}
              view={this.props.starhop.eyepieceView}
              location={this.props.starhop.location}
              skyDarkness={this.props.starhop.skyDarkness}
              updateLocation={this.props.updateLocation}
              dsos={this.props.starhop.dsos}
            />
            <ScopeMagnificationSelector
              view={this.props.starhop.eyepieceView}
              handler={this.handleMagnification}
              magnifications={MAGNIFICATIONS}
            />
            {targetFound}
            <ScopeButtons location={this.props.starhop.location} changeLocation={this.props.updateLocation} />
          </div>
          <div>
            <StarHopSelector
              selectedItem={this.props.starhop.selectedHop.id}
              hops={hopItems}
              handler={this.loadHopData}
              stars={hopStars}
              selectedStar={this.props.starhop.selectedHop.selectedStar.name}
              starHandler={this.updateStartingStar}
              description={this.props.starhop.selectedHop.description}
            />
            <Hints
              starhop={this.props.starhop.selectedHop}
              hints={this.props.starhop.hints}
              updateHints={this.props.updateHints}
            />
          </div>
        </div>
      </div>
    );
  }
}
