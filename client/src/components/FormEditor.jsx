import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useFormStore } from "../store/formStore";
import { QuestionCard } from "./QuestionCard";
import { FormHeader } from "./FormHeader";
import { AddQuestionButtons } from "./AddQuestionButtons";

export function FormEditor() {
  const { currentForm, setCurrentForm } = useFormStore();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedFormId, setSavedFormId] = useState(null);

  const handleSave = async () => {
    if (!currentForm.title || !currentForm.description) {
      setError("Please provide a title and description for the form");
      return;
    }

    if (currentForm.questions.length === 0) {
      setError("Please add at least one question to the form");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forms`,
        currentForm
      );
      setSavedFormId(response.data._id);
      setSaving(false);
    } catch (err) {
      setError("Failed to save form. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Forms
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <FormHeader />
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white transition-colors`}
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save Form"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {savedFormId && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
            Form saved successfully!{" "}
            <Link
              to={`/form/${savedFormId}`}
              className="text-green-700 hover:text-green-800 underline"
            >
              View form
            </Link>
          </div>
        )}

        {currentForm?.headerImage && (
          <img
            src={currentForm.headerImage}
            alt="Form header"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

        <div className="space-y-6">
          {currentForm?.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        <AddQuestionButtons />
      </div>
    </div>
  );
}
