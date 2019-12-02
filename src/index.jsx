import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import add from './chunk0';
import commonJS from './common';
import style from './style.css';

// console.log(style);
console.log(add(1, 2));
console.log(commonJS());

ReactDOM.render(<App />, document.querySelector('#root'));
