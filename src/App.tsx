import { useState, lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Global.scss";
import "../styles/Trends.scss";
import "../styles/Navigation.scss";
import "../styles/VacationPanel.scss";
import "../styles/RandomCity.scss";
import "../styles/ActionBar.scss";
import "../styles/ErrorUI.scss";
import "../styles/Footer.scss";

import Layout from "./components/ui/Layout";
import Admin from "./components/Admin";

// Lazy loading - the components will load only when the user visits them

const Shop = lazy(() => import("./components/Shop"));
const Vacations = lazy(() => import("./components/Vacations"));
const Login = lazy(() => import("./components/ui/LoginPanel"));
const Register = lazy(() => import("./components/ui/RegisterPanel"));
const UpdateProduct = lazy(() => import("./components/UpdateProduct"));
const TrendsCurrency = lazy(() => import("./components/TrendsCurrency"));
const RandomCity = lazy(() => import("./components/RandomCity"));
const Testing = lazy(() => import("./components/Testing"));
const Slider = lazy(() => import("./components/Slider"));
const Google = lazy(() => import("./components/Google"));

function App() {
  const [colorMode, setColorMode] = useState("dark");

  const lightMode = () => {
    setColorMode("light");
  };

  const darkMode = () => {
    setColorMode("dark");
  };

  return (
    <div className={`App ${colorMode}`}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout lightMode={lightMode} darkMode={darkMode}>
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/vacations" element={<Vacations />} />
              <Route path="/trends" element={<TrendsCurrency />} />
              <Route path="/random-city" element={<RandomCity />} />
              <Route path="/slider" element={<Slider />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/google" element={<Google />} />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
