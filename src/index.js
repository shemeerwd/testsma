import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './registerServiceWorker';
import "antd/dist/antd.less";
import './assets/css/style.css';
import { init } from "./config/firebase";

init();

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.register()