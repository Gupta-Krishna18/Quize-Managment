import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import QuestionCard from '../components/QuestionCard';
import { useAuth } from '../context/AuthContext';

export default function QuizAttempt() {
  const { id } = useParams(); // quiz id
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then(res => setQuiz(res.data))
      .catch(err => {
        console.error(err);
        alert('Cannot load quiz');
      });
  }, [id]);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submit = async () => {
    if (!token) {
      alert('Please login to submit quiz');
      navigate('/login');
      return;
    }

    try {
      // backend expects map questionId -> selectedAnswer
      const payload = { answers: answers };
      const res = await API.post(`/quizzes/${id}/attempt`, payload);
      const attempt = res.data;
      // attempt.id should be present. Redirect to result page with attempt id.
      navigate(`/result/${attempt.id}`);
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  if (!quiz) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Attempting: {quiz.title}</h2>

        {quiz.questions && quiz.questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
            selected={answers[q.id]}
          />
        ))}

        <div className="flex gap-3">
          <button onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded">Submit Answers</button>
        </div>
      </div>
    </div>
  );
}
