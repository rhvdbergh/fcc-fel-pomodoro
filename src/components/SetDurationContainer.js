import React from 'react';

import Button from './Button';
import LengthDisplay from './LengthDisplay';
import Label from './Label';

const SetDurationContainer = props => {
  const lowerCaseTitle = props.title.toLowerCase();

  return (
    <div id={`${lowerCaseTitle}_container`}>
      <Label labelId={`${lowerCaseTitle}-label`} labelText={`${props.title}`} />
      <div id={`${lowerCaseTitle}_controls_container`}>
        <Button btnId={`${lowerCaseTitle}-decrement`} btnText="-" />
        <LengthDisplay
          lengthDisplayId={`${lowerCaseTitle}-length`}
          lengthDisplayText={props.duration}
        />
        <Button btnId={`${lowerCaseTitle}-increment`} btnText="+" />
      </div>
    </div>
  );
};

export default SetDurationContainer;
