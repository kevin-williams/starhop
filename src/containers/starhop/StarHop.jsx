import React, { Component, Link } from 'react';
import { connect } from 'react-redux';
import ScopeMagnificationSelector from '../../components/starmap/ScopeMagnificationSelector';

const hopData = require('../../../public/db/hopData.json');

import ErrorLine from '../../components/error/ErrorLine';
import ScopeTypeSelector from '../../components/starmap/ScopeTypeSelector';
import StarHopSelector from '../../components/starmap/StarHopSelector';
import StarMap from '../../components/starmap/StarMap';
import {
  getStars,
  getDeepSpaceObjects,
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
    this.props.updateLocation(hopInfo.startingLocation);
  };

  handleScopeType = e => {
    // console.log('Change scopeType=', e);
    let scopeType = e.value;

    let newView = this.props.starhop.eyepieceView;
    newView.scopeType = scopeType;

    this.props.updateEyepieceView(newView);
  };

  handleMagnification = e => {
    // console.log('Change scopeType=', e);
    let fov = e.value;

    let newView = this.props.starhop.eyepieceView;
    newView.fov = fov;

    this.props.updateEyepieceView(newView);
  };

  handleFinderMagnification = e => {
    // console.log('Change scopeType=', e);
    let fov = e.value;

    let newView = this.props.starhop.view;
    newView.fov = fov;

    this.props.updateView(newView);
  };

  render() {
    let targetFound = this.props.starhop.targetFound ? (
      <div className="starhop-hopview__target-found">Target in Eyepiece View!</div>
    ) : null;

    return (
      <div>
        <div className="starhop-hopview">
          <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />
          <div>
            <StarMap
              stars={this.props.starhop.stars}
              dsos={this.props.starhop.dsos}
              location={this.props.starhop.location}
              view={this.props.starhop.view}
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
              updateLocation={this.props.updateLocation}
              dsos={this.props.starhop.dsos}
            />
            <ScopeMagnificationSelector
              view={this.props.starhop.eyepieceView}
              handler={this.handleMagnification}
              magnifications={MAGNIFICATIONS}
            />
            {targetFound}
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
