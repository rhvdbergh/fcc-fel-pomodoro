import React from 'react';

const TomatoSVG = props => {
  return (
    <svg id="tomato" viewBox="0 0 780.27 800.52" width="350" height="300">
      <g id="layer1" transform="translate(0 -225)">
        <path
          id="tomato_outline"
          fillRule="evenodd"
          strokeWidth="30px"
          strokeDasharray={props.dasharray}
          strokeDashoffset={props.dashOffset}
          stroke="tomato"
          fill="#000000"
          d="m402.57 252.35c10.084 27.825-1.3514 98.821 9.0041 115.67 10.987 17.882 145.04-15.296 223.36 38.334 78.33 53.64 171.32 201.87 114.25 336.19-57.08 134.32-243.34 242.48-348.43 246.62-189.61 5.81-304.24-43.48-375.6-236.99-18.767-74.65-23.199-96.21-5.111-179.08 45.536-163.85 170.55-189.97 313.84-214.82 58.53-12.002-21.777-93.447 4.6446-105.87 22.392-3.0311 64.132-10.226 64.05-0.0468z"
        />
        <path
          id="tomato_stem"
          fillRule="evenodd"
          strokeWidth="30px"
          strokeDasharray={props.leafDasharray}
          strokeDashoffset={props.leafDashOffset}
          stroke="tomato"
          fill="#000000"
          d="m337.15 263.41c-1.1133 10.585 14.285 45.707 16.497 63.541 2.2114 17.834 6.9702 30.137-11.074 34.025-18.044 3.8876-19.748 11.782-36.111 12.412-16.363 0.63076-31.974-1.3587-40.413 11.886-8.4387 13.244-17.863 23.895-24.641 36.542-6.7777 12.647 10.806 3.9332 23.903 2.3731 13.098-1.56 47.4-25.123 56.068-11.983 8.6675 13.14-14.216 88.052-4.0625 90.821 10.153 2.7685 44.158-72.698 64.983-74.209 20.825-1.5113 48.851 64.519 59.967 65.142 11.116 0.62273-1.2943-58.986 6.7266-61.406 8.021-2.4198 35.364 47.824 41.399 46.887 6.035-0.93717-6.7316-47.861-5.1894-52.51 1.5422-4.6488 26.007 7.6681 14.403-4.3075s-11.474-41.512-32.861-45.872c-21.387-4.3601-59.151 3.9296-60.87-14.566-1.7192-18.496-3.1953-86.357-9.318-104.74-5.791-3.2739-55.027 2.8185-59.406 5.9677z"
        />
      </g>
    </svg>
  );
};

export default TomatoSVG;
