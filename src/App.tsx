import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskFormPage from "./pages/TaskFormPage";
import VolunteersPage from "./pages/VolunteersPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";


function App() {

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailsPage /></ProtectedRoute>} />
        <Route path="/tasks/new" element={<ProtectedRoute role="COORDINATOR"><TaskFormPage key="new"/></ProtectedRoute>} />
        <Route path="/tasks/:id/edit" element={<ProtectedRoute role="COORDINATOR"><TaskFormPage key="edit"/></ProtectedRoute>} />
        <Route path="/volunteers" element={<ProtectedRoute role="COORDINATOR"><VolunteersPage /></ProtectedRoute>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </main>
    </>
  )
}

export default App
