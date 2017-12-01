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
  magLimit: 10,
}

const PLEIADES_QUERY = {
  raFrom: 3.3,
  raTo: 4.5,
  decFrom: 20,
  decTo: 27,
  magLimit: 10,
}

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps, { getStars })
export default class StarHop extends Component {
  render() {
    return (
      <div>
        <div className="starhop-hopview">
        <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />
        <StarMap stars={this.props.starhop.stars} view={this.props.starhop.view}/>
        <StarMap stars={this.props.starhop.stars} view={this.props.starhop.eyepieceView}/>
        </div>
        <div>
          <button onClick={() => this.props.getStars(PLEIADES_QUERY)}>Load</button>
          <button onClick={() => this.props.history.goBack()}>Back</button>
        </div>
      </div>
    );
  }
}
