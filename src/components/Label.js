import React from 'react';

const Label = props => {
  return (
    <div id={props.labelId} className="label">
      {props.labelText}
    </div>
  );
};

export default Label;
