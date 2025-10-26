import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Online Quiz System</h1>
        <p className="text-gray-700 mb-4">Take quizzes, track scores, and improve your skills.</p>
        <div className="flex gap-4">
          <Link to="/quizzes" className="bg-blue-600 text-white px-4 py-2 rounded">Browse Quizzes</Link>
          <Link to="/admin" className="bg-gray-200 px-4 py-2 rounded">Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
