import { useState, lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/Global.scss";
import "../styles/Navigation.scss";
import "../styles/VacationPanel.scss";
import "../styles/ActionBar.scss";
import "../styles/ErrorUI.scss";
import "../styles/Footer.scss";

import Layout from "./components/ui/Layout";
import Admin from "./components/Admin";

const Shop = lazy(() => import("./components/Shop"));
const Vacations = lazy(() => import("./components/Vacations"));
const Login = lazy(() => import("./components/ui/LoginPanel"));
const Register = lazy(() => import("./components/ui/RegisterPanel"));

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
              <Route path="shop" element={<Shop />} />
              <Route path="vacations" element={<Vacations />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
