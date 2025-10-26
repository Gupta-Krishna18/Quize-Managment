import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import QuizList from './pages/QuizList'
import QuizDetail from './pages/QuizDetail'
import QuizAttempt from './pages/QuizAttempt'
import ResultPage from './pages/ResultPage'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoute from './utils/PrivateRoute'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/attempt/:id" element={<PrivateRoute><QuizAttempt /></PrivateRoute>} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
