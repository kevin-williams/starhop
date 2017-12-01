import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorLine from '../../components/error/ErrorLine';
import StarMap from '../../components/starmap/StarMap';

import styles from './StarHop.scss';

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps)
export default class StarHop extends Component {
  render() {
    return (
      <div className="starhop-location">
        <ErrorLine statusList={[this.props.starhop.zipCodeStatus]} />
        <StarMap stars={this.props.starhop.stars} view={this.props.starhop.view}/>
        <button onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    );
  }
}
