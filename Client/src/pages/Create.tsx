import { useState } from "react";
import UseTop from "../Hooks/useTop";

const Create = () => {
  const [questionType, setQuestionType] = useState("text");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  UseTop();
  const handleOptionChange = (index : number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = ()=>{
    console.log("Feedback only FE!");
  }


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
              <strong>Step 2:</strong> If you choose text, your users will have a
              free space to type their feedback.
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

          {/* Question Type Selector */}
          <div>
            <label className="block font-medium mb-2 text-lg">Question Type</label>
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
                  required
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
