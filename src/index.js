import ReactDom from 'react-dom/client';
import React from 'react';
import {App} from './App.js'
import './App.css';

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App/>)