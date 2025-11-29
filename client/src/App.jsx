import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList.jsx"
import Orders from "./pages/seller/Orders.jsx"
import Loading from "./components/Loading.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import MyProfile from "./pages/MyProfile.jsx"

function App() {
  const location = useLocation();
  const isSellerPath = location.pathname.toLowerCase().includes("seller");
  const isAuthPage = location.pathname === "/";
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <>
      <div className="text-default min-h-screen text-gray-300" >
        {isSellerPath || isAuthPage ? null : <Navbar />}
        {showUserLogin ? <Login /> : null}
        <Toaster />
        <div className={`${isSellerPath || isAuthPage ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/loader" element={<Loading />} />
            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />} >
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="/seller/product-list" element={<ProductList />} />
              <Route path="/seller/orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>
        {!isSellerPath && !isAuthPage && <Footer />}

        {/* Animated Wave Background */}
        <div className="wave">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </>
  )
}

export default App
