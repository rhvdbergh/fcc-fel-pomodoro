import React from 'react';

import Button from './Button';
import SetDurationContainer from './SetDurationContainer';
import Timer from './Timer';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeftText: '25:00',
      timeLeft: 1500, // seconds
      startStopText: 'Start',
      timerLabelText: 'Session',
      breakLength: 5, // minutes
      sessionLength: 25, // minutes
      inSession: false,
      inBreak: false,
      timerRunning: false
    };

    this.initialState = this.state; // in case we need to reset to default values

    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.reset = this.reset.bind(this);
    this.startStop = this.startStop.bind(this);
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

    this.setState({ timeLeftText: `${min}:${seconds}` });

    if (this.state.timeLeft === 0) {
      // timer has run out!
      if (this.state.inSession) {
        const len = this.state.breakLength * 60;
        this.setState({
          inSession: false,
          inBreak: true,
          timeLeft: len,
          timerLabelText: 'Break'
        });
      } else if (this.state.inBreak) {
        const len = this.state.sessionLength * 60;
        this.setState({
          inSession: true,
          inBreak: false,
          timeLeft: len,
          timerLabelText: 'Session'
        });
      }
    }
  }

  startStop() {
    this.setState({ timerRunning: !this.state.timerRunning });
    this.calcTimeLeft();

    if (!this.state.inSession && !this.state.inBreak) {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      this.calcTimeLeft();
      this.setState({ inSession: true });
    }

    if (this.state.startStopText === 'Start') {
      this.setState({ startStopText: 'Stop' });
    } else {
      this.setState({ startStopText: 'Start' });
    }
    this.calcTimeLeft();
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
    this.setState(this.initialState);
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

    startStopBtn.addEventListener('click', () => this.startStop());

    resetBtn.addEventListener('click', () => this.reset());

    const timer = setInterval(() => {
      if (this.state.timerRunning) {
        this.calcTimeLeft();
        this.setState({ timeLeft: this.state.timeLeft - 1 });
      }
    }, 1000);
  }

  render() {
    return (
      <div id="container">
        <SetDurationContainer title="Break" duration={this.state.breakLength} />
        <SetDurationContainer
          title="Session"
          duration={this.state.sessionLength}
        />
        <Timer
          timerLabelText={this.state.timerLabelText}
          timeLeft={this.state.timeLeftText}
        />
        <div id="controls_container">
          <Button btnId="start_stop" btnText={this.state.startStopText} />
          <Button btnId="reset" btnText="Reset" />
        </div>
        <audio src="./beep.mp3" id="beep"></audio>
      </div>
    );
  }
}

export default Container;
