import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const tasks = [
  { id: 1, label: 'Rinse Off Frogs', completed: false },
  { id: 2, label: 'Increase average to 5+ yards per carry', completed: false },
  { id: 3, label: 'Double Dutch', completed: true },
  { id: 4, label: 'Sautee Onions', completed: false }
];
root.render(
  <React.StrictMode>
    <App storedTasks={tasks}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
