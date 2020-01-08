import React from 'react';

import Button from './Button';
import SetDurationContainer from './SetDurationContainer';
import Timer from './Timer';
import TomatoSVG from './TomatoSVG';
import SplatSVG from './SplatSVG';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeftText: '25:00',
      timeLeft: 1500, // seconds (default 1500)
      initialTime: 1500, // seconds default 1500
      startStopText: 'Start',
      timerLabelText: 'Session',
      breakLength: 5, // minutes (default 5)
      sessionLength: 25, // minutes (default 25)
      inSession: false,
      inBreak: false,
      timerRunning: false,
      timer: null,
      dashOffset: 0,
      leafDashOffset: 0,
      dasharray: 0,
      leafDasharray: 0,
      tomatoLineLength: 0,
      leafLineLength: 0,
      showSplat: false
    };

    this.initialState = this.state; // in case we need to reset to default values

    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.subtractTime = this.subtractTime.bind(this);
    this.calcTimeLeft = this.calcTimeLeft.bind(this);
  }

  calcTimeLeft() {
    let seconds = this.state.timeLeft % 60;
    let min = (this.state.timeLeft - seconds) / 60;

    if ((seconds + '').length < 2) {
      seconds = '0' + seconds;
    }

    if ((min + '').length < 2) {
      min = '0' + min;
    }

    // calculate how far the line should be painted for tomato animation
    let percentageComplete =
      (this.state.initialTime - this.state.timeLeft) / this.state.initialTime;
    let drawLength = this.state.tomatoLineLength * percentageComplete;
    let newOffset = this.state.tomatoLineLength - drawLength;
    drawLength = this.state.leafLineLength * percentageComplete;
    let newLeafOffset = this.state.leafLineLength - drawLength;
    this.setState({
      timeLeftText: `${min}:${seconds}`,
      dashOffset: newOffset,
      leafDashOffset: newLeafOffset
    });

    if (this.state.timeLeft === 0) {
      // timer has run out!
      this.toggleTimer(); // we're going to pause for one second
      const beep = document.getElementById('beep');
      beep.play();
      this.setState({ showSplat: true });
      setTimeout(() => this.setState({ showSplat: false }), 5000);
      if (this.state.inSession) {
        const len = this.state.breakLength * 60;
        if ((this.state.breakLength + '').length < 2) {
          min = '0' + this.state.breakLength;
        } else {
          min = this.state.breakLength;
        }
        this.setState({
          inSession: false,
          inBreak: true,
          timerLabelText: 'Break',
          timeLeft: len,
          initialTime: len
        });
        setTimeout(() => {
          this.setState({ timeLeftText: `${min}:00` });
          this.toggleTimer();
        }, 1000);
      } else if (this.state.inBreak) {
        const len = this.state.sessionLength * 60;
        if ((this.state.sessionLength + '').length < 2) {
          min = '0' + this.state.sessionLength;
        } else {
          min = this.state.sessionLength;
        }
        this.setState({
          inSession: true,
          inBreak: false,
          timerLabelText: 'Session',
          timeLeft: len,
          initialTime: len
        });
        setTimeout(() => {
          this.setState({ timeLeftText: `${min}:00` });
          this.toggleTimer();
        }, 1000);
      }
    }
  }

  subtractTime() {
    let newTime = this.state.timeLeft - 1;
    this.setState({ timeLeft: newTime });
    this.calcTimeLeft();
  }

  toggleTimer() {
    if (!this.state.inSession && !this.state.inBreak) {
      // timer has never been started since load or last reset

      // calculate offset for the tomato animation
      const tomatoOutline = document.getElementById('tomato_outline');
      const leafOutline = document.getElementById('tomato_stem');
      const tomatoLineLength = tomatoOutline.getTotalLength();
      const leafLineLength = leafOutline.getTotalLength();
      this.setState({
        tomatoLineLength: tomatoLineLength,
        leafLineLength: leafLineLength
      });

      let newOffset = this.state.tomatoLineLength;
      let newDasharray = this.state.tomatoLineLength;
      let newLeafOffset = this.state.leafLineLength;
      let newLeafDasharray = this.state.leafLineLength;
      this.setState({
        inSession: true,
        dashOffset: newOffset,
        dasharray: newDasharray,
        leafDashOffset: newLeafOffset,
        leafDasharray: newLeafDasharray,
        initialTime: this.state.timeLeft
      });
    }
    if (this.state.timerRunning) {
      // timer is running
      clearInterval(this.state.timer);
      this.setState({
        startStopText: 'Start',
        timerRunning: !this.state.timerRunning
      });
    } else {
      // timer is not running
      this.setState({
        timer: setInterval(this.subtractTime, 1000),
        startStopText: 'Stop',
        timerRunning: !this.state.timerRunning
      });
    }
  }

  setBreakLength(sign) {
    if (sign === '-' && !(this.state.breakLength <= 1)) {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }

    if (sign === '+' && !(this.state.breakLength > 59)) {
      this.setState({ breakLength: this.state.breakLength + 1 });
    }
  }

  setSessionLength(sign) {
    if (sign === '-' && !(this.state.sessionLength <= 1)) {
      this.setState({ sessionLength: this.state.sessionLength - 1 });
    }

    if (sign === '+' && !(this.state.sessionLength > 59)) {
      this.setState({ sessionLength: this.state.sessionLength + 1 });
    }

    if (!this.state.inSession && !this.state.inBreak) {
      const len = this.state.sessionLength * 60;

      this.setState({ timeLeft: len });
      this.calcTimeLeft();
    }
  }

  reset() {
    clearInterval(this.state.timer);
    this.setState({
      startStopText: 'Start',
      timerRunning: !this.state.timerRunning
    });
    this.setState(this.initialState);
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  }

  componentDidMount() {
    const incrementBreakBtn = document.getElementById('break-increment');
    const decrementBreakBtn = document.getElementById('break-decrement');
    const incrementSessionBtn = document.getElementById('session-increment');
    const decrementSessionBtn = document.getElementById('session-decrement');

    const startStopBtn = document.getElementById('start_stop');
    const resetBtn = document.getElementById('reset');

    incrementBreakBtn.addEventListener('click', () => this.setBreakLength('+'));
    decrementBreakBtn.addEventListener('click', () => this.setBreakLength('-'));
    incrementSessionBtn.addEventListener('click', () =>
      this.setSessionLength('+')
    );
    decrementSessionBtn.addEventListener('click', () =>
      this.setSessionLength('-')
    );

    startStopBtn.addEventListener('click', () => this.toggleTimer());

    resetBtn.addEventListener('click', () => this.reset());
  }

  render() {
    return (
      <div id="container">
        <Timer
          timerLabelText={this.state.timerLabelText}
          timeLeft={this.state.timeLeftText}
        />
        {this.state.showSplat ? (
          <SplatSVG />
        ) : (
          <TomatoSVG
            dasharray={this.state.dasharray}
            dashOffset={this.state.dashOffset}
            leafDashOffset={this.state.leafDashOffset}
            leafDasharray={this.state.leafDasharray}
          />
        )}
        <div id="controls_wrapper">
          <SetDurationContainer
            title="Break"
            duration={this.state.breakLength}
          />
          <SetDurationContainer
            title="Session"
            duration={this.state.sessionLength}
          />
          <div id="controls_container">
            <Button btnId="start_stop" btnText={this.state.startStopText} />
            <Button btnId="reset" btnText="Reset" />
          </div>
        </div>
        <audio src="./beep.mp3" id="beep"></audio>
      </div>
    );
  }
}

export default Container;
