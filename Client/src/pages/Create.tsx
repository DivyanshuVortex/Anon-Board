import { useState } from "react";
import UseTop from "../Hooks/useTop";

const Create = () => {
  const [questionType, setQuestionType] = useState("text");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [link, setLink] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  UseTop();

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (questionType === "mcq") {
      const validOptions = options.filter((opt) => opt.trim());
      if (validOptions.length < 2) {
        setError("Please provide at least two options for MCQ.");
        return;
      }
    }
    setError("");

    const data = {
      content: question,
      type: questionType,
      options:
        questionType === "mcq"
          ? options.filter((opt) => opt.trim() !== "")
          : undefined,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create feedback");
      }

      const result = await response.json();
      setFeedbackId(result.id);
      setLink(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[var(--bg)] p-6 sm:p-10 text-[var(--text)]">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create a Feedback Question
        </h1>

        {/* Step-by-Step Guide */}
        <section className="bg-[var(--card-bg)] p-6 rounded-2xl shadow mb-10 leading-relaxed">
          <h2 className="text-xl font-semibold mb-4">Step-by-Step Guide</h2>
          <ol className="list-decimal pl-5 space-y-4 text-lg">
            <li>
              <strong>Step 1:</strong> Decide whether your feedback should be a{" "}
              <span className="font-medium">short written answer</span> or a{" "}
              <span className="font-medium">multiple-choice question</span>.
            </li>
            <li>
              <strong>Step 2:</strong> If you choose text, your users will have
              a free space to type their feedback.
            </li>
            <li>
              <strong>Step 3:</strong> If you choose MCQ, think of 2–5 possible
              answers you want to offer.
            </li>
            <li>
              <strong>Step 4:</strong> Write your question clearly so it’s easy
              to understand.
            </li>
            <li>
              <strong>Step 5:</strong> Submit and save your question — it will
              be added to your feedback form.
            </li>
          </ol>
        </section>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--card-bg)] p-8 rounded-2xl shadow space-y-6"
        >
          {/* Question Input */}
          <div>
            <label className="block font-medium mb-2 text-lg">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your feedback question..."
              className="w-full p-3 rounded-lg border border-gray-300 bg-[var(--input-bg)]"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          {/* Generated Link */}
          {link && (
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center bg-[var(--card-bg)] border border-gray-300 rounded-lg shadow px-4 py-2">
                <input
                  type="text"
                  value={`/feedback/${feedbackId}`}
                  readOnly
                  className="bg-[var(--input-bg)] text-[var(--text)] outline-none w-64 px-2 py-1 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `/feedback/${feedbackId}`
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 5000);
                  }}
                  className={`ml-3 px-3 py-1 rounded transition ${
                    copied
                      ? "bg-green-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* Question Type Selector */}
          <div>
            <label className="block font-medium mb-2 text-lg">
              Question Type
            </label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="text"
                  checked={questionType === "text"}
                  onChange={(e) => setQuestionType(e.target.value)}
                />
                Text Answer
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="mcq"
                  checked={questionType === "mcq"}
                  onChange={(e) => setQuestionType(e.target.value)}
                />
                Multiple Choice
              </label>
            </div>
          </div>

          {/* MCQ Options */}
          {questionType === "mcq" && (
            <div>
              <label className="block font-medium mb-2 text-lg">Options</label>
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-[var(--input-bg)] mb-2"
                />
              ))}
              <button
                type="button"
                onClick={addOption}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-600"
              >
                + Add Option
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Generate Unique Id
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
