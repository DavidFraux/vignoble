import React from 'react';
import { fullPage } from './TouchSwipeEvents.module.css';

class TouchSwipeEvents extends React.Component {

  constructor(props) {
    super(props);

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    this.state = { swiped: false};
    this._swipe = {};
    this.minDistance = 50;
  }

  _onTouchStart(e) {
    const touch = e.touches[0];
    this._swipe = { x: touch.clientX };
    this.setState({ swiped: false });
  }

  _onTouchMove(e) {
    if (e.changedTouches && e.changedTouches.length) {
      //const touch = e.changedTouches[0];
      this._swipe.swiping = true;
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const dX = touch.clientX - this._swipe.x;
    const absX = Math.abs(dX);
    if (this._swipe.swiping && absX > this.minDistance ) {
      //this.props.onSwiped && this.props.onSwiped();
      this.setState({ swiped: true });
      (dX < 0)? this.props.onSwiped('left') : this.props.onSwiped('right');
    }
    this._swipe = {};
  }

  render() {
    return (
      <div
        className={fullPage}
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}>
      </div>
    );
  }

}

export default TouchSwipeEvents

