import Mani from "./pages/Mani";
import { Routes, Route, Navigate } from "react-router-dom";

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
import Contact from "./pages/Contact";
import RequestDesign from "./pages/RequestDesign";

import CustomerLayout from "./layouts/CustomerLayout";
import About from "./pages/About";



function App() {
  return (
    <Routes>

      {/* =====================================================
          CUSTOMER WEBSITE
      ====================================================== */}

      <Route element={<CustomerLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/mani" element={<Mani />} />

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

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/request-design"
          element={<RequestDesign />}
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
        <Route path="/admin/mani-types" element={<Navigate to="/admin/products" replace />} />

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
