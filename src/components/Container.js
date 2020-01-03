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
      startStop: 'Start',
      timerLabelText: 'Session',
      breakLength: 5,
      sessionLength: 25,
      inSession: false,
      inBreak: false
    };

    this.initialState = this.state; // in case we need to reset to default values

    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.reset = this.reset.bind(this);
    this.calcTimeLeft = this.calcTimeLeft.bind(this);
  }

  calcTimeLeft() {
    console.log(this.state.timeLeft);

    let seconds = this.state.timeLeft % 60;
    let min = (this.state.timeLeft - seconds) / 60;

    if ((seconds + '').length < 2) {
      seconds = '0' + seconds;
    }

    if ((min + '').length < 2) {
      min = '0' + min;
    }

    console.log(min);

    this.setState({ timeLeftText: `${min}:${seconds}` });
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

    const len = this.state.sessionLength * 60;

    this.setState({ timeLeft: len });
    this.calcTimeLeft();
  }

  reset() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    const incrementBreakBtn = document.getElementById('break-increment');
    const decrementBreakBtn = document.getElementById('break-decrement');
    const incrementSessionBtn = document.getElementById('session-increment');
    const decrementSessionBtn = document.getElementById('session-decrement');

    const resetBtn = document.getElementById('reset');

    incrementBreakBtn.addEventListener('click', () => this.setBreakLength('+'));
    decrementBreakBtn.addEventListener('click', () => this.setBreakLength('-'));
    incrementSessionBtn.addEventListener('click', () =>
      this.setSessionLength('+')
    );
    decrementSessionBtn.addEventListener('click', () =>
      this.setSessionLength('-')
    );

    resetBtn.addEventListener('click', () => this.reset());
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
          <Button btnId="start_stop" btnText={this.state.startStop} />
          <Button btnId="reset" btnText="Reset" />
        </div>
      </div>
    );
  }
}

export default Container;
