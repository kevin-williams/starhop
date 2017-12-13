import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './StarMap.scss';

const ARCMINUTE_TO_DEG = 0.0167;
const DSO_SCALE_CONSTANT = 0.7; // You won't see the full extent of the object in most scopes, so make it a bit smaller
const RA_TO_DEG = 24 / 360;

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

    let myView = this.props.view;
    let location = this.props.location;

    // console.log('drawing map for ' + this.props.stars.length + ' stars with view=', myView);

    this.drawFOV(ctx, myView);
    this.drawReticle(ctx, myView);

    ctx.save();
    this.drawScopeCircle(ctx, myView);

    this.props.stars.map(star => {
      if (isInView(star.ra, star.dec, star.mag, myView, location)) {
        this.drawStar(ctx, myView, location, star);
      }
    });

    this.props.dsos.map(dso => {
      if (isInView(dso.ra, dso.dec, dso.mag, myView, location)) {
        this.drawDSO(ctx, myView, location, dso);
      }
    });

    ctx.restore();
  }

  drawFOV(ctx, view) {
    if (view.fov) {
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '15px Georgia';
      ctx.fillText(`${view.fov}°`, 10, 20);
      ctx.restore();
    }
  }

  drawReticle(ctx, view) {
    let centerX = view.width / 2;
    let centerY = view.height / 2;

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

  drawStar(ctx, view, location, starEntry) {
    try {
      let { ra, dec, mag } = starEntry;
      // console.log('view=', view);
      // console.log('starEntry=', starEntry);

      let { x, y } = getXYCoords(ra, dec, view, location);

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

      if (flipVertically) {
        y = view.height - y;
      }

      if (flipHorizontally) {
        x = view.width - x;
      }

      let size = Math.floor(20 - 2 * mag);
      let halfSize = Math.ceil(size / 2);
      if (size > 2) {
        var grd = ctx.createRadialGradient(x, y, 0, x, y, halfSize);
        grd.addColorStop(0, 'rgba(255,255,255,1)');
        grd.addColorStop(1, 'rgba(0,0,0,0');

        ctx.fillStyle = grd;
      } else {
        size = 1;
        halSize = 0;
        ctx.fillStyle = 'White';
      }
      // console.log(`drawing star (${ra}, ${dec}) at x=${x} y=${y} size=${size} mag=${mag} for fov=${view.fov}`);

      ctx.fillRect(x - halfSize, y - halfSize, size, size);
    } catch (error) {
      console.log('error drawing star', error);
    }
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

  drawDSO(ctx, view, location, dso) {
    // console.log('view=', view);
    // console.log('dso=', dso);
    ctx.save();
    try {
      let flip = this.getFlip(view);
      let { ra, dec, r1, r2, angle } = dso;
      if (!r2) {
        r2 = r1;
      }

      // console.log('dso=', dso);
      // Scale vs the view size in both RA (X) and degrees (Y)
      let scaleX = view.width / view.fov / RA_TO_DEG;
      let scaleY = view.height / view.fov;

      // Calculate the x,y using the difference from the location and the bottom right corner
      let { x, y } = getXYCoords(ra, dec, view, location);

      // Figure height and width of the DSO, but use scaleY (degrees) for both directions
      let dsoWidth = Math.ceil(r1 * ARCMINUTE_TO_DEG * scaleY * DSO_SCALE_CONSTANT); // NOT scaleX
      let dsoHeight = Math.ceil(r2 * ARCMINUTE_TO_DEG * scaleY * DSO_SCALE_CONSTANT);

      if (flip.flipVertically) {
        y = view.height - y;
      }

      if (flip.flipHorizontally) {
        x = view.width - x;
      }

      let minSize = dsoHeight < dsoWidth ? dsoHeight * 0.7 : dsoWidth * 0.7;
      let maxSize = dsoHeight > dsoWidth ? dsoHeight * 0.7 : dsoWidth * 0.7;

      let widthHeightRatio = dsoWidth / dsoHeight;
      let drawAngle = 360 - angle * Math.PI / 180;
      if (flip.flipHorizontally && !flip.flipVertically) {
        drawAngle = 180 - angle * Math.PI / 180;
      }

      ctx.translate(x, y);
      ctx.rotate(drawAngle);
      ctx.scale(widthHeightRatio, 1);

      // console.log(
      //   'drawing dso at x=' + x + ' y=' + y + ' with sizeX=' + dsoWidth + ', sizeY=' + dsoHeight + ' for mag=' + dso.mag
      // );

      var grd = ctx.createRadialGradient(0, 0, 0, 0, 0, minSize);
      grd.addColorStop(0, 'rgba(255,255,255,1)');
      grd.addColorStop(1, 'rgba(0,0,0,0');

      ctx.fillStyle = grd;
      if (maxSize < 5) {
        if (view.fov < 2) {
          ctx.fillStyle = 'blue';
        } else {
          ctx.fillStyle = 'white';
        }
      }

      ctx.beginPath();
      ctx.arc(0, 0, maxSize / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    } catch (error) {
      console.log('dso draw error', error);
    } finally {
      ctx.restore();
    }
  }

  onMouseDown = e => {
    // console.log('MouseDown=', e);
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
      // console.log('handling drag with state=', this.state);
      let view = this.props.view;
      let scaleX = view.width / view.fov / RA_TO_DEG;
      let scaleY = view.height / view.fov;

      let diffX = e.clientX - this.state.startX;
      let diffY = e.clientY - this.state.startY;

      // console.log(`scaleX = ${scaleX} scaleY=${scaleY} diffX=${diffX} diffY=${diffY}`);

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
    // console.log('MouseUp=', e);
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

// TODO move this to util
function isInView(ra, dec, mag, view, location) {
  let widthRA = view.fov * RA_TO_DEG / 2;
  let widthDec = view.fov / 2;

  return Math.abs(location.ra - ra) < widthRA && Math.abs(location.dec - dec) < widthDec && view.magLimit > mag;
}

function getXYCoords(ra, dec, view, location) {
  let x = view.width / 2;
  let y = view.height / 2;

  let widthRA = view.fov * RA_TO_DEG / 2;
  let widthDec = view.fov / 2;

  let offsetX = (location.ra - ra) / widthRA * view.width / 2;
  let offsetY = (location.dec - dec) / widthDec * view.height / 2;

  return { x: x + offsetX, y: y + offsetY };
}

StarMap.propTypes = {
  stars: PropTypes.array.isRequired,
  dsos: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  updateLocation: PropTypes.func,
};
