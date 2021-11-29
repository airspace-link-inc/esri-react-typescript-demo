import 'normalize.css';
import './style/main.scss';
//import "antd/lib/button/style/index.css";

import React from 'react';
import { render } from 'react-dom';
import App from './App';

function renderApp() {
  render(<App />, document.getElementById('root'));
}

renderApp();
