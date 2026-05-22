import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './components/Admin/AdminPanel'
import RegisterPanel from './components/Admin/RegisterPanel'
import './App.css'
import HomePage from './components/Home/Home'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/register" element={<RegisterPanel />} />
        <Route path="/admin/login" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App