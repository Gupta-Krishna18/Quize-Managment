import { useState, useEffect } from 'react';
import API from '../api/api';

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(10);
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await API.get('/admin/quizzes');
      setQuizzes(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load admin quizzes (ensure you are admin)');
    }
  };

  const createQuiz = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/quizzes', { title, description, duration });
      setTitle(''); setDescription(''); setDuration(10);
      loadQuizzes();
    } catch (err) {
      console.error(err);
      alert('Failed to create quiz');
    }
  };

  const deleteQuiz = async (id) => {
    if (!confirm('Delete quiz?')) return;
    try {
      await API.delete(`/admin/quizzes/${id}`);
      loadQuizzes();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-medium mb-2">Create Quiz</h3>
        <form onSubmit={createQuiz} className="grid gap-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" required />
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (mins)" type="number" className="p-2 border rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
        </form>
      </div>

      <div className="grid gap-3">
        {quizzes.map(q => (
          <div key={q.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-medium">{q.title}</div>
              <div className="text-sm text-gray-600">{q.description}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => deleteQuiz(q.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
