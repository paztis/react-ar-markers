import React from 'react';
import ReactDOM from 'react-dom';
import {AR, Map} from './index';

const fullScreenStyle: any = {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0};

ReactDOM.render(
  <div style={fullScreenStyle}>
    <AR />
    {/* <Map /> */}
  </div>,
  document.getElementById('root'),
);
