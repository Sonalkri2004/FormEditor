import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ExternalLink, Trash2, Copy } from "lucide-react";
import axios from "axios";

export function FormList() {
  const [forms, setForms] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/forms`
      );
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/forms/${id}`);
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const copyToClipboard = async (id) => {
    const url = `${window.location.origin}/form/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Glowing Elements */}
        <div className="absolute top-10 left-20 w-96 h-96 bg-blue-700 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 opacity-25 blur-2xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500 to-teal-500 opacity-10 blur-3xl rounded-full"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-gray-100">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold">Forms</h1>
          <Link
            to="/create"
            className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-3"
          >
            <Plus size={24} />
            <span>Create Form</span>
          </Link>
        </div>

        {/* Forms Section */}
        <div className="space-y-8">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-gray-800 rounded-xl shadow-xl p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
            >
              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 to-blue-500"></div>

              {/* Card Content */}
              <div className="flex-1 pr-4">
                {/* Form Title */}
                <h2 className="text-2xl font-semibold text-white mb-1">
                  {form.title}
                </h2>
                {/* Form Description */}
                <p className="text-sm text-gray-400">{form.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => copyToClipboard(form._id)}
                  className="text-gray-400 hover:text-teal-400 transform hover:scale-110 transition duration-300"
                  title="Copy form link"
                >
                  <Copy size={24} />
                </button>
                <Link
                  to={`/form/${form._id}`}
                  className="text-blue-400 hover:text-blue-500 transform hover:scale-110 transition duration-300"
                  title="Open form"
                >
                  <ExternalLink size={24} />
                </Link>
                <button
                  onClick={() => handleDelete(form._id)}
                  className="text-red-400 hover:text-red-500 transform hover:scale-110 transition duration-300"
                  title="Delete form"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {forms.length === 0 && (
            <div className="text-center py-16 bg-gray-800 rounded-xl shadow-lg">
              <p className="text-lg text-gray-400 mb-4">
                No forms created yet.
              </p>
              <Link
                to="/create"
                className="px-5 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:shadow-md transform hover:scale-105 transition duration-300 flex items-center gap-3"
              >
                <Plus size={24} />
                Create your first form
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
