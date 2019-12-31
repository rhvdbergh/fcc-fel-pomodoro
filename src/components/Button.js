import React from 'react';

const Button = props => {
  return (
    <div id={props.btnId} className="button">
      {props.btnText}
    </div>
  );
};

export default Button;
