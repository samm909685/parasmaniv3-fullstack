import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Favorites from "./pages/Favorites";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Media from "./pages/admin/Media";
import DesignRequests from "./pages/admin/DesignRequests";
import Settings from "./pages/admin/Settings";

import CustomerLayout from "./layouts/CustomerLayout";


function App() {
  return (
    <Routes>

      {/* =====================================================
          CUSTOMER WEBSITE
      ====================================================== */}

      <Route element={<CustomerLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/collections"
          element={<Collections />}
        />

        <Route
          path="/collections/:category"
          element={<CategoryProducts />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

      </Route>


      {/* =====================================================
          ADMIN LOGIN
          PUBLIC
      ====================================================== */}

      <Route
        path="/admin/login"
        element={<Login />}
      />


      {/* =====================================================
          PROTECTED ADMIN AREA
          
          Every route inside this block requires
          a valid admin login token.
      ====================================================== */}

      <Route element={<ProtectedRoute />}>

        {/* Dashboard */}

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />


        {/* Categories */}

        <Route
          path="/admin/categories"
          element={<Categories />}
        />


        {/* Products */}

        <Route
          path="/admin/products"
          element={<Products />}
        />


        {/* Media */}

        <Route
          path="/admin/media"
          element={<Media />}
        />


        {/* Design Requests */}

        <Route
          path="/admin/design-requests"
          element={<DesignRequests />}
        />


        {/* Settings */}

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

      </Route>

    </Routes>
  );
}

export default App;