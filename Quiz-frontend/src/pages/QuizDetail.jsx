import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/api';

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then(res => setQuiz(res.data))
      .catch(err => {
        console.error(err);
        alert('Unable to load quiz.');
      });
  }, [id]);

  if (!quiz) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">{quiz.title}</h2>
        <p className="text-gray-600 mt-2">{quiz.description}</p>
        <p className="mt-2">Duration: {quiz.duration || 'N/A'} mins</p>

        <div className="mt-4">
          <Link to={`/attempt/${quiz.id}`} className="bg-blue-600 text-white px-4 py-2 rounded">Start Quiz</Link>
        </div>

        <div className="mt-6">
          <h3 className="font-medium">Questions ({quiz.questions ? quiz.questions.length : 0})</h3>
          <ul className="list-disc ml-6 mt-2">
            {quiz.questions && quiz.questions.map(q => (
              <li key={q.id} className="mb-2">{q.questionText}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
