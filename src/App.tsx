import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import AppLayout from './Layout/App/AppLayout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import Admin from './Layout/Admin/Admin';
import Auth from './pages/auth/Auth';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import Checkout from './pages/Checkout/Checkout';
import Order from './pages/Order/Order';
import Search from './pages/Search/Search';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import Main from './router/Main';
import './sass/_global.scss';
import AdminAccounts from './pages/AdminAccounts/AdminAccounts';
import AdminCategories from './pages/AdminCategory/AdminCategories';
import Dashboard from './pages/AdminDashboard/Dashboard';
import AdminOrders from './pages/AdminOrders/AdminOrders';
import AdminProduct from './pages/AdminProducts/AdminProduct';
import User from './Layout/User/User';
import UserInf from './pages/UserInf/UserInf';
import UserOrders from './pages/UserOrders/UserOrders';
import AboutUs from './pages/AboutUs/AboutUs';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Products from './pages/Products/Products';
import { useRefreshQuery } from './features/Auth/authApiSlice';
import OrderDetail from './components/OrderDetail/OrderDetail';
import ShipperOrder from './components/Shipper/ShipperOrder/ShipperOrder';
import ShipOrder from './components/Shipper/ShipOrder/ShipOrder';

const Home = lazy(() => import('./pages/Home/Home'));
const DetailProduct = lazy(() => import('./pages/DetailProduct/DetailProduct'));
// const Products = lazy(() => import('./pages/Products/Products'));

function App() {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  useRefreshQuery();

  // useEffect(() => {
  //   const refresh = async () => {
  //     try {
  //       const res = await axiosPrivate.get('/user/refresh');

    //     dispatch(
    //       logginSuccess({
    //         accessToken: res.data.token,
    //         user: res.data.data.user,
    //       })
    //     );
    //   } catch (error: any) { }
    // };

  //   window.onload = () => {
  //     refresh();
  //   };
  // }, [axiosPrivate, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* public routes */}
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<Main />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<DetailProduct />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="search" element={<Search />} />
            <Route path="about-us" element={<AboutUs />} />
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route index element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>

          {/* protect route user */}
          <Route element={<RequireAuth allowedRoles="user" />}>
            <Route element={<Main />}>
              <Route path="order" element={<Order />} />
              <Route path="me" element={<User />}>
                <Route index element={<Navigate to="info" replace />} />
                <Route path="info" element={<UserInf />} />
                <Route path="my-order" element={<UserOrders />} />
                <Route path="my-order/:orderId" element={<OrderDetail />} />
              </Route>
            </Route>
          </Route>
          {/* protect route admin*/}
          <Route element={<RequireAuth allowedRoles="admin" />}>
            <Route path="admin" element={<Admin />}>
            <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="category" element={<AdminCategories />} />
              <Route path="product" element={<AdminProduct />} />
              <Route path="order" element={<AdminOrders />} />
              <Route
                path="order/:orderId"
                element={<OrderDetail role="admin" />}
              />
              <Route path="account" element={<AdminAccounts />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles="shipper" />}>
            <Route path="shipper" element={<Admin role="shipper" />}>
              <Route index element={<Navigate to="order" replace />} />
              <Route path="order" element={<ShipperOrder />} />
              <Route
                path="shipping"
                element={<ShipOrder status="Shipping" />}
              />
              <Route path="success" element={<ShipOrder status="Success" />} />
              <Route
                path="order/:orderId"
                element={<OrderDetail role="shipper" />}
              />
              <Route
                path="shipping/:orderId"
                element={<OrderDetail role="shipper" />}
              />
              <Route
                path="success/:orderId"
                element={<OrderDetail role="shipper" />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* hien thi thong bao */}
      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  );
}

export default App;