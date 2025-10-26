import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

export default function ResultPage() {
  const { id } = useParams(); // attempt id
  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    API.get(`/attempts/${id}`)
      .then(res => setAttempt(res.data))
      .catch(err => {
        console.error(err);
        alert('Cannot load result');
      });
  }, [id]);

  if (!attempt) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-3">Result</h2>
        <p><strong>Quiz:</strong> {attempt.quiz.title}</p>
        <p><strong>Score:</strong> {attempt.score ? attempt.score.toFixed(2) : '0'}%</p>
        <p><strong>Started:</strong> {new Date(attempt.startedAt).toLocaleString()}</p>
        <p><strong>Completed:</strong> {new Date(attempt.completedAt).toLocaleString()}</p>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Your Answers</h3>
          {attempt.answers && attempt.answers.map(a => (
            <div key={a.id} className="mb-2 p-3 border rounded">
              <div className="font-medium">{a.question.questionText}</div>
              <div>Selected: {a.selectedAnswer}</div>
              <div>Correct: {a.question.correctAnswer}</div>
              <div>Correct? {a.selectedAnswer && a.selectedAnswer === a.question.correctAnswer ? 'Yes' : 'No'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
