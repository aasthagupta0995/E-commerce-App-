import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './components/Admin/AdminPanel'
import RegisterPanel from './components/Admin/RegisterPanel'
import './App.css'
import HomePage from './components/Home/Home'
import Products from './components/Products/Products'
import SurveyForm from './components/Survey/SurveyForm'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<RegisterPanel />} />
        <Route path="/admin/login" element={<AdminPanel />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App