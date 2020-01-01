import React from 'react';
import Label from './Label';
import TimeLeft from './TimeLeft';

const Timer = props => {
  return (
    <div id="timer_container">
      <Label labelId="timer-label" labelText={props.timerLabelText} />
      <TimeLeft timeLeft={props.timeLeft} />
    </div>
  );
};

export default Timer;
