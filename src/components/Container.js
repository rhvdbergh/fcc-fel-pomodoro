import React from 'react';

import Button from './Button';
import SetDurationContainer from './SetDurationContainer';
import Timer from './Timer';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: '25:00',
      startStop: 'Start',
      timerLabelText: 'Session',
      breakLength: 5,
      sessionLength: 25
    };

    this.initialState = this.state; // in case we need to reset to default values

    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
  }

  setBreakLength(sign) {
    if (sign === '-' && !(this.state.breakLength < 1)) {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }

    if (sign === '+' && !(this.state.breakLength > 59)) {
      this.setState({ breakLength: this.state.breakLength + 1 });
    }
  }

  setSessionLength(sign) {
    if (sign === '-' && !(this.state.sessionLength < 1)) {
      this.setState({ sessionLength: this.state.sessionLength - 1 });
    }

    if (sign === '+' && !(this.state.sessionLength > 59)) {
      this.setState({ sessionLength: this.state.sessionLength + 1 });
    }
  }

  render() {
    return (
      <div id="container">
        <SetDurationContainer
          title="Break"
          duration={this.state.breakLength}
          setter={this.setBreakLength}
        />
        <SetDurationContainer
          title="Session"
          duration={this.state.sessionLength}
          setter={this.setSessionLength}
        />
        <Timer
          timerLabelText={this.state.timerLabelText}
          timeLeft={this.state.timeLeft}
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
