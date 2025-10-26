import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold">{quiz.title}</h3>
      <p className="text-sm text-gray-600 my-2">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm">Duration: {quiz.duration || 'N/A'} mins</span>
        <Link to={`/quiz/${quiz.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Take Quiz</Link>
      </div>
    </div>
  );
}
