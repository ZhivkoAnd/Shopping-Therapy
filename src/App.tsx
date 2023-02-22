import { useState } from "react";
import Shop from "./components/Shop";
import Layout from "./components/ui/Layout";

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
        <Shop />
        <p>Hello !</p>
      </Layout>
    </div>
  );
}

export default App;
