import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorLine from '../../components/error/ErrorLine';
import StarMap from '../../components/starmap/StarMap';
import { getStars } from './starHopActions';

import styles from './StarHop.scss';

const ORION_QUERY = {
  raFrom: 4.5,
  raTo: 6.5,
  decFrom: -15,
  decTo: 15,
  magLimit: 9,
}

const PLEIADES_QUERY = {
  raFrom: 3.6,
  raTo: 4,
  decFrom: 22,
  decTo: 25,
  magLimit: 9,
}

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps, { getStars })
export default class StarHop extends Component {
  render() {
    return (
      <div className="starhop-location">
        <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />
        <StarMap stars={this.props.starhop.stars} view={this.props.starhop.view}/>
        <button onClick={() => this.props.getStars(ORION_QUERY)}>Load</button>
        <button onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    );
  }
}
