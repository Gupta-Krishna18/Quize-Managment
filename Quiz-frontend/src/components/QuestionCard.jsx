import { useState } from 'react';

export default function QuestionCard({ question, onAnswer, selected }) {
  // options come as JSON string in backend; expect question.optionsJson or options array
  let options = [];
  if (question.options) {
    options = question.options;
  } else if (question.optionsJson) {
    try { options = JSON.parse(question.optionsJson); } catch (e) { options = []; }
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <p className="font-medium">{question.questionText}</p>
      <div className="mt-2 grid gap-2">
        {options && options.length > 0 ? options.map((opt, idx) => {
          const key = `${question.id}-${idx}`;
          const isSelected = selected === opt;
          return (
            <button
              key={key}
              onClick={() => onAnswer(question.id, opt)}
              className={`text-left p-2 rounded border ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}
            >
              {opt}
            </button>
          );
        }) : (
          <input
            className="w-full p-2 border rounded"
            placeholder="Type your answer"
            value={selected || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
