import React from 'react';

class Timer {
  constructor(callbackfunction, delay, name) {
    this.active = false;//each timer knows if active or not. So when you clear a timer, then resume it, nothing happend. You have to reset it fisrt
    this.name = name;
    this.timerId = delay;
    this.start = delay;
    this.remaining = null;
    this.callBack = callbackfunction;
    this.originalDelay = delay;
  }

  pause() {
    if (this.active){
      clearTimeout(this.timerId);
      this.remaining -= Date.now() - this.start;
      //console.log(`${this.name} paused`);
    };
  };

  resume() {
    if (this.active){
      this.start = Date.now();
      clearTimeout(this.timerId);
      this.timerId = setTimeout(
        () => {this.callBack(); this.clear()},
        this.remaining);
      //console.log(`${this.name} remaining: ${this.remaining}`);
    }
  };

  reset(newDelay) {
    newDelay ? this.remaining = newDelay : this.remaining = this.originalDelay;
    this.active = true;
    this.resume();
    //console.log(`${this.name} restarted`);
  }

  clear() {
    clearTimeout(this.timerId);
    this.active = false;
    //console.log(`${this.name} cleared`);
  }

};

export default Timer;