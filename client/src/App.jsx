import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormEditor } from './components/FormEditor';
import { FormList } from './components/FormList';
import { FormRenderer } from './components/FormRenderer';
import { FormSuccess } from './components/FormSuccess';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Glowing Elements */}
        <div className="absolute top-10 left-20 w-96 h-96 bg-blue-700 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 opacity-25 blur-2xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500 to-teal-500 opacity-10 blur-3xl rounded-full"></div>
      </div>
    <div className='relative z-10'>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/create" element={<FormEditor />} />
        <Route path="/form/:id" element={<FormRenderer />} />
        <Route path="/success" element={<FormSuccess />} />
      </Routes>
    </div>
  </div>
  );
}

export default App;