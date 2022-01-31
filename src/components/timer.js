import React from 'react';

class Timer {
  constructor(callback, delay, name) {
    this.name = name;
    this.timerId = delay;
    this.start = delay;
    this.remaining = delay;
    this.callBack = callback;
    this.originalDelay = delay;
    console.log('inTimer: ', delay);
  }

  pause() {
      clearTimeout(this.timerId);
      this.remaining -= Date.now() - this.start;
      console.log(`${this.name} paused`);
  };

  resume() {
      this.start = Date.now();
      clearTimeout(this.timerId);
      this.timerId = setTimeout(this.callBack, this.remaining);
      console.log(`${this.name} remaining: ${this.remaining}`);
  };

  reset(newDelay) {
    newDelay ? this.remaining = newDelay : this.remaining = this.originalDelay;
    this.resume();
  }

  clear() {
    clearTimeout(this.timerId);
    console.log(`${this.name} cleared`);
  }

};

export default Timer;