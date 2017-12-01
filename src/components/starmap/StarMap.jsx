import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './StarMap.scss';

export default class StarMap extends Component {
  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    this.drawMap();
  }

  drawMap() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.view.width, this.props.view.height);

    this.props.stars.map(star => {
      this.drawStar(ctx, this.props.view, star);
    });
  }

  drawStar(ctx, view, starEntry) {
    // console.log('view=', view);
    // console.log('starEntry=', starEntry);

    let flipVertically = false;
    let flipHorizontally = false;

    switch (view.scopeType) {
      case 'Refractor':
      case 'SCT':
        flipHorizontally = true;
        break;
      case 'Dobsonian':
        flipHorizontally = true;
        flipVertically = true;
    }

    let ra = starEntry.RA;
    let dec = starEntry.Dec;
    let x = view.width / (view.raTo - view.raFrom) * (view.raTo - ra);
    let y = view.height / (view.decTo - view.decFrom) * (view.decTo - dec);

    if (flipVertically) {
      y = view.height - y;
    }

    if (flipHorizontally) {
      x = view.width - x;
    }

    let mag = starEntry.Mag;

    if (view.magLimit < mag) {
      // skip drawing this one
      return;
    }

    let size = Math.floor(20 - 2 * mag);
    let xadd = Math.floor(size / 2);

    var grd = ctx.createRadialGradient(x + xadd, y + xadd, 0, x + xadd, y + xadd, xadd);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, 'black');

    ctx.fillStyle = grd;

    // console.log('drawing star at x=' + x + ' y=' + y + ' with size=' + size + ' for mag=' + mag);

    ctx.fillRect(x, y, size, size);
  }

  render() {
    return (
      <div className="starhop-starmap">
        <canvas ref="canvas" width={this.props.view.width} height={this.props.view.height} />
      </div>
    );
  }
}

StarMap.propTypes = {
  stars: PropTypes.array.isRequired,
  view: PropTypes.object.isRequired,
};
