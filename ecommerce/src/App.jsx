import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './components/Admin/AdminPanel'
import RegisterPanel from './components/Admin/RegisterPanel'
import './App.css'
import HomePage from './components/Home/Home'
import Products from './components/Products/Products'
import SurveyForm from './components/Survey/SurveyForm'
import store from '../store/store'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<RegisterPanel />} />
        <Route path="/admin/login" element={<AdminPanel />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  )
}

export default App