import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './components/Admin/AdminPanel'
import RegisterPanel from './components/Admin/RegisterPanel'
import './App.css'
import Products from './components/Products/Products'
import SurveyForm from './components/Survey/SurveyForm'
import store from '../store/store'
import { Provider } from 'react-redux'
import AuthGuard from './components/Admin/AuthGuard'
import Dashboard from './components/Admin/Dashboard.tsx'
import UserSignUp from './components/User/UserSignUp.tsx'
import UserLogin from './components/User/UserLogIn.tsx'
import UserHomePage from './components/User/UserHomePage.tsx'
import UserAuthGuard from './components/User/UserAuthGuard.tsx'
import RoleHomeRedirect from './components/RoleHomeRedirect.tsx'


const App = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<RoleHomeRedirect />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<RegisterPanel />} />
        <Route path="/admin/login" element={<AdminPanel />} />
        <Route path="/user/signUp" element={<UserSignUp/>} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route element={<UserAuthGuard />}>
        <Route path="/user/homepage" element={<UserHomePage />} />
        </Route>
        <Route element={<AuthGuard />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  )
}

export default App