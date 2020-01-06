import React from 'react';
import './App.css';
import Routes from './Routes';
import { Navbar } from './components/navbar/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}
