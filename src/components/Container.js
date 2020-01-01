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
