import { Routes, Route } from "react-router-dom";

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
import Settings from "./pages/admin/Settings";

import CustomerLayout from "./layouts/CustomerLayout";

function App() {
  return (
    <Routes>

      {/* ==========================
          CUSTOMER WEBSITE
      ========================== */}

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

      {/* ==========================
          ADMIN
      ========================== */}

      <Route
        path="/admin/login"
        element={<Login />}
      />

      <Route
        path="/admin/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/admin/categories"
        element={<Categories />}
      />

      <Route
        path="/admin/products"
        element={<Products />}
      />

      <Route
        path="/admin/media"
        element={<Media />}
      />

      <Route
        path="/admin/settings"
        element={<Settings />}
      />

    </Routes>
  );
}

export default App;