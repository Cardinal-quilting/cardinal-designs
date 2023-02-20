import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LaunchPage from 'pages/launch-page/launch-page';
import ProjectPage from 'pages/project-page';

export default function App() {
  return ( 
    <div>
    <Router>
    <Routes>
    <Route path="/" element={<LaunchPage />}/>
    <Route path="/project" element={<ProjectPage />}/>
    </Routes>
    </Router>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)