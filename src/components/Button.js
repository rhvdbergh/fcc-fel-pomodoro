import React from 'react';

const Button = props => {
  return (
    <div
      id={props.btnId}
      className="button"
      onClick={() => props.setter(props.btnText)}
    >
      {props.btnText}
    </div>
  );
};

export default Button;
