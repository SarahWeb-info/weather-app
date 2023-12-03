import React from 'react';
import './css/App.css';
import Intro from './tabs/Intro';
import Main from './tabs/Main.js';
import AroundUs from './tabs/AroundUs';
import Setting from './tabs/Setting.js';
import { BrowserRouter , Routes , Route } from "react-router-dom";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/app" element={<Main />} />
        <Route path="/aroundUs" element={<AroundUs />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}