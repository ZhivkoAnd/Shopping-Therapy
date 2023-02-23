import { useState } from "react";
import Shop from "./components/Shop";
import Admin from "./components/Admin";
import Layout from "./components/ui/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../styles/Global.scss";
import "../styles/Navigation.scss";
import "../styles/VacationPanel.scss";
import "../styles/ActionBar.scss";
import "../styles/ErrorUI.scss";
import "../styles/Footer.scss";


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
      <Layout lightMode={lightMode} darkMode={darkMode}>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={ <Admin/> } />
        <Route path="shop" element={ <Shop/> } />
      </Routes>
      </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
