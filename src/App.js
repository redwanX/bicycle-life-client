import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Home from './pages/Home/Home';
import Footer from './pages/Shared/Footer';
import Header from './pages/Shared/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';
import RequireAuth from './pages/Authentication/RequireAuth';
import Purchase from './pages/Purchase/Purchase';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
        <Route path='/purchase/:id' element={<RequireAuth><Purchase></Purchase></RequireAuth>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
