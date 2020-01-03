import React from 'react';

import Button from './Button';
import LengthDisplay from './LengthDisplay';
import Label from './Label';

const SetDurationContainer = props => {
  const lowerCaseTitle = props.title.toLowerCase();

  return (
    <div id={`${lowerCaseTitle}_container`}>
      <Label
        labelId={`${lowerCaseTitle}-label`}
        labelText={`${props.title} Length`}
      />
      <Button btnId={`${lowerCaseTitle}-decrement`} btnText="-" />
      <Button btnId={`${lowerCaseTitle}-increment`} btnText="+" />
      <LengthDisplay
        lengthDisplayId={`${lowerCaseTitle}-length`}
        lengthDisplayText={props.duration}
      />
    </div>
  );
};

export default SetDurationContainer;
