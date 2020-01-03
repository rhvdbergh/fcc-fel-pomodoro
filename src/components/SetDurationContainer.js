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
      <Button
        btnId={`${lowerCaseTitle}-decrement`}
        btnText="-"
        setter={props.setter}
      />
      <Button
        btnId={`${lowerCaseTitle}-increment`}
        btnText="+"
        setter={props.setter}
      />
      <LengthDisplay
        lengthDisplayId={`${lowerCaseTitle}-length`}
        lengthDisplayText={props.duration}
      />
    </div>
  );
};

export default SetDurationContainer;
