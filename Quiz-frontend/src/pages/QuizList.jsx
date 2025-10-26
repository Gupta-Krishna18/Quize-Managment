// import { useEffect, useState } from 'react';
// import API from '../api/api';
// import QuizCard from '../components/QuizCard';

// export default function QuizList() {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const res = await API.get('/quizzes');
//       setQuizzes(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load quizzes');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 grid gap-4">
//       <h2 className="text-2xl mb-4">Available Quizzes</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {quizzes.map(q => <QuizCard key={q.id} quiz={q} />)}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import API from '../api/api';
import QuizCard from '../components/QuizCard';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]); // ✅ must start as []

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/quizzes");
        console.log("Response:", res.data);
        // ✅ Check if backend sends array directly or wrapped
        if (Array.isArray(res.data)) {
          setQuizzes(res.data);
        } else if (Array.isArray(res.data.quizzes)) {
          setQuizzes(res.data.quizzes);
        } else {
          console.error("Unexpected response format:", res.data);
          setQuizzes([]);
        }
      } catch (err) {
        console.error("Failed to load quizzes", err);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-6 grid gap-4">
      <h2 className="text-2xl mb-4">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.length > 0 ? (
          quizzes.map((q) => <QuizCard key={q.id} quiz={q} />)
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </div>
  );
}
