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

    console.log('drawing map for ' + this.props.stars.length + ' stars with view=', this.props.view);

    let myView = this.props.view;
    let location = this.props.location;

    // In RA, 0.07 == 1 degree
    myView.raFrom = location.ra - myView.fov * 0.07 / 2;
    myView.raTo = location.ra + myView.fov * 0.07 / 2;

    myView.decFrom = location.dec - myView.fov / 2;
    myView.decTo = location.dec + myView.fov / 2;

    this.drawFOV(ctx, myView);

    this.drawScopeCircle(ctx, myView);

    this.props.stars.map(star => {
      this.drawStar(ctx, myView, star);
    });

    this.props.dsos.map(dso => {
      this.drawDSO(ctx, myView, dso);
    });

    this.drawReticle(ctx, myView);
    console.log('finished drawing map');
  }

  drawFOV(ctx, view) {
    if (view.fov) {
      ctx.fillStyle = 'white';
      ctx.font = '15px Georgia';
      ctx.fillText(`${view.fov}°`, 10, 20);
    }
  }

  drawReticle(ctx, view) {
    let centerX = view.width / 2;
    let centerY = view.height / 2;
    console.log(`centerX ${centerX} centerY ${centerY}`);

    // Draw horizontal
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY);
    ctx.lineTo(centerX - 5, centerY);

    ctx.moveTo(centerX + 5, centerY);
    ctx.lineTo(centerX + 10, centerY);

    ctx.moveTo(centerX, centerY - 10);
    ctx.lineTo(centerX, centerY - 5);

    ctx.moveTo(centerX, centerY + 5);
    ctx.lineTo(centerX, centerY + 10);

    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  drawScopeCircle(ctx, view) {
    ctx.beginPath();
    ctx.arc(view.width / 2, view.height / 2, view.height / 2, 0, 2 * Math.PI);
    ctx.closePath();
    // ctx.fillStyle = 'black';
    ctx.clip();

    // draw edge of circle
    ctx.beginPath();
    ctx.arc(view.width / 2, view.height / 2, view.height / 2 - 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = 'grey';
    ctx.stroke();
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

    if (Number(view.magLimit) < Number(mag)) {
      // console.log('skipping entry for magLimit=' + view.magLimit, starEntry);
      // skip drawing this one
      return;
    }

    let size = Math.floor(20 - 2 * mag);
    if (size > 2) {
      let xadd = Math.floor(size / 2);

      var grd = ctx.createRadialGradient(x + xadd, y + xadd, 0, x + xadd, y + xadd, xadd);
      grd.addColorStop(0, 'rgba(255,255,255,1)');
      grd.addColorStop(1, 'rgba(0,0,0,0');

      ctx.fillStyle = grd;
    } else {
      size = 1;
      ctx.fillStyle = 'White';
    }
    // console.log('drawing star at x=' + x + ' y=' + y + ' with size=' + size + ' for mag=' + mag);

    ctx.fillRect(x, y, size, size);
  }

  getFlip(view) {
    let result = {
      flipHorizontally: false,
      flipVertically: false,
    };

    switch (view.scopeType) {
      case 'Refractor':
      case 'SCT':
        result.flipHorizontally = true;
        break;
      case 'Dobsonian':
        result.flipHorizontally = true;
        result.flipVertically = true;
    }

    return result;
  }

  drawDSO(ctx, view, dso) {
    // console.log('view=', view);
    // console.log('dso=', dso);
    try {
      let flip = this.getFlip(view);

      let ra = dso.ra;
      let dec = dso.dec;

      if (view.raFrom > ra || view.raTo < ra || view.decFrom > dec || view.DecTo < dec) {
        // console.log('\tskip drawing dso');
        return;
      }

      let x = view.width / (view.raTo - view.raFrom) * (view.raTo - ra);
      let y = view.height / (view.decTo - view.decFrom) * (view.decTo - dec);

      if (flip.flipVertically) {
        y = view.height - y;
      }

      if (flip.flipHorizontally) {
        x = view.width - x;
      }

      let mag = dso.mag;

      if (Number(view.magLimit) < Number(mag)) {
        // console.log('skipping entry for magLimit=' + view.magLimit, dso);
        // skip drawing this one
        return;
      }

      let size = Math.floor(20 - 2 * mag);
      if (size > 2) {
        let xadd = Math.floor(size / 2);

        var grd = ctx.createRadialGradient(x + xadd, y + xadd, 0, x + xadd, y + xadd, xadd);
        grd.addColorStop(0, 'rgba(0,255,0,1)');
        grd.addColorStop(1, 'rgba(0,0,0,0');

        ctx.fillStyle = grd;
      } else {
        size = 4;
        ctx.fillStyle = 'blue';
      }
      // console.log('drawing star at x=' + x + ' y=' + y + ' with size=' + size + ' for mag=' + mag);

      ctx.fillRect(x, y, size, size);
    } catch (error) {
      console.log('dso draw error', error);
    }
  }

  onMouseDown = e => {
    console.log('MouseDown=', e);
    this.setState({
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startRA: this.props.location.ra,
      startDec: this.props.location.dec,
    });
  };

  onMouseMove = e => {
    if (this.props.updateLocation && this.state && this.state.dragging) {
      // Process drag move
      // console.log('handling drag');
      let view = this.props.view;
      let scaleX = view.width / (view.raTo - view.raFrom);
      let scaleY = view.height / (view.decTo - view.decFrom);

      let diffX = e.clientX - this.state.startX;
      let diffY = e.clientY - this.state.startY;

      let flip = this.getFlip(view);
      if (flip.flipHorizontally) {
        diffX = -diffX;
      }

      if (flip.flipVertically) {
        diffY = -diffY;
      }

      // console.log(`diffX=${diffX}, diffY=${diffY}`);

      let newLocation = {
        ra: this.state.startRA + diffX / scaleX,
        dec: this.state.startDec + diffY / scaleY,
      };

      // console.log('setting newLocation', newLocation);

      this.props.updateLocation(newLocation);
    }
  };

  onMouseUp = e => {
    console.log('MouseUp=', e);
    this.setState({
      dragging: false,
    });
  };

  render() {
    return (
      <div
        className="starhop-starmap"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <canvas ref="canvas" width={this.props.view.width} height={this.props.view.height} />
      </div>
    );
  }
}

StarMap.propTypes = {
  stars: PropTypes.array.isRequired,
  dsos: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  updateLocation: PropTypes.func,
};
