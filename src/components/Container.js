import React from 'react';

import Label from './Label';
import LengthDisplay from './LengthDisplay';
import TimeLeft from './TimeLeft';
import Button from './Button';

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
  }

  render() {
    return (
      <div id="container">
        <Label labelId="break-label" labelText="Break Length" />
        <Button btnId="break-decrement" btnText="-" />
        <Button btnId="break-increment" btnText="+" />
        <LengthDisplay
          lengthDisplayId="break-length"
          lengthDisplayText={this.state.breakLength}
        />
        <Label labelId="session-label" labelText="Session Label" />
        <Button btnId="session-decrement" btnText="-" />
        <Button btnId="session-increment" btnText="+" />
        <LengthDisplay
          lengthDisplayId="session-length"
          lengthDisplayText={this.state.sessionLength}
        />
        <Label labelId="timer-label" labelText={this.state.timerLabelText} />
        <TimeLeft timeLeft={this.state.timeLeft} />
        <Button btnId="start_stop" btnText={this.state.startStop} />
        <Button btnId="reset" btnText="Reset" />
      </div>
    );
  }
}

export default Container;
