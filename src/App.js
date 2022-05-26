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
import MyOrder from './pages/Dashboard/Order/MyOrder';
import AddReview from './pages/Dashboard/AddReview/AddReview';
import MyProfile from './pages/Dashboard/MyProfile/MyProfile';
import Payment from './pages/Payment/Payment';
import RequireAdmin from './pages/Authentication/RequireAdmin';
import MakeAdmin from './pages/Dashboard/MakeAdmin/MakeAdmin';
import AddProduct from './pages/Dashboard/AddProduct/AddProduct';
import ManageProducts from './pages/Dashboard/ManageProducts/ManageProducts';
import ManageOrders from './pages/Dashboard/ManageOrders/ManageOrders';
import Portfolio from './pages/Portfolio/Portfolio';
import PageNotFound from './pages/Shared/PageNotFound';
import Blogs from './pages/Blogs/Blogs';

function App() {

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/portfolio' element={<Portfolio></Portfolio>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/blog' element={<Blogs></Blogs>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='order' element={<MyOrder></MyOrder>}></Route>
          <Route path='review' element={<AddReview></AddReview>}></Route>
          <Route path='makeAdmin' element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>}></Route>
          <Route path='addProduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='manageProducts' element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>
          <Route path='manageOrders' element={<RequireAdmin><ManageOrders></ManageOrders></RequireAdmin>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
        </Route>
        <Route path='/purchase/:id' element={<RequireAuth><Purchase></Purchase></RequireAuth>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
