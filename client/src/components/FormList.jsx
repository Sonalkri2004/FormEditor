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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Forms</h1>
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Create Form
        </Link>
      </div>

      <div className="grid gap-4">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{form.title}</h2>
                <p className="text-gray-600">{form.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(form._id)}
                  className="p-2 text-gray-500 hover:text-gray-700 relative"
                  title="Copy form link"
                >
                  <Copy size={20} />
                  {copySuccess === form._id && (
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-green-500 whitespace-nowrap">
                      Link copied!
                    </span>
                  )}
                </button>
                <Link
                  to={`/form/${form._id}`}
                  className="p-2 text-blue-500 hover:text-blue-700"
                  title="Open form"
                >
                  <ExternalLink size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(form._id)}
                  className="p-2 text-red-500 hover:text-red-700"
                  title="Delete form"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {forms.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No forms created yet.</p>
            <Link
              to="/create"
              className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-2 mt-4"
            >
              <Plus size={20} />
              Create your first form
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
