import React from 'react';

const LengthDisplay = props => {
  return (
    <div id={props.lengthDisplayId} className="length_display">
      {props.lengthDisplayText}
    </div>
  );
};

export default LengthDisplay;
