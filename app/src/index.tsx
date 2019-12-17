import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ChessGame } from './components/ChessGame';
import { LocalEngine } from './game-engine/local-engine/LocalEngine';
import 'bootstrap/dist/css/bootstrap.min.css';

let engine = new LocalEngine();

ReactDOM.render(<ChessGame engine={engine} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
