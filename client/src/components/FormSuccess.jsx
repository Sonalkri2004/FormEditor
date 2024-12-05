import React from 'react';
import { Link } from 'react-router-dom';
import {  CheckCheck,ArrowBigLeftDash } from 'lucide-react';

export function FormSuccess() {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Glowing Elements */}
        <div className="absolute top-10 left-20 w-96 h-96 bg-blue-700 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 opacity-25 blur-2xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500 to-teal-500 opacity-10 blur-3xl rounded-full"></div>
      </div>
      <div className="bg-gray-800 relative z-10 p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="flex justify-center mb-4">
          <CheckCheck className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl text-white font-bold mb-2">Thank You!</h1>
        <p className="text-gray-400 mb-6">
          Your form has been submitted successfully.
        </p>
        <Link
          to="/"
          className="inline-flex items-center  gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg hover:bg-blue-600"
        >
          <ArrowBigLeftDash size={20} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}