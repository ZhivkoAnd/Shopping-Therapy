import { useState, lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from './components/Context/Context';
// Connects the Redux store to our react app
import { Provider } from "react-redux";
import { store } from './components/Redux/state/store'

import "bootstrap/dist/css/bootstrap.css";
import "../styles/Global.scss";
import "../styles/Trends.scss";
import "../styles/Navigation.scss";
import "../styles/VacationPanel.scss";
import "../styles/RandomCity.scss";
import "../styles/ActionBar.scss";
import "../styles/ErrorUI.scss";
import "../styles/Footer.scss";
import "../styles/Form.scss";

import Layout from "./components/ui/Layout";
import Admin from "./components/Admin";

// Lazy loading - the components will load only when the user visits them

const Shop = lazy(() => import("./components/Shop"));
const Vacations = lazy(() => import("./components/Vacations"));
const Login = lazy(() => import("./components/ui/LoginPanel"));
const Register = lazy(() => import("./components/ui/RegisterPanel"));
const UpdateProduct = lazy(() => import("./components/UpdateProduct"));
// const TrendsCurrency = lazy(() => import("./components/TrendsCurrency"));
const RandomCity = lazy(() => import("./components/RandomCity"));
const GuessGame = lazy(() => import("./components/GuessGame"));
const SearchSynonyms = lazy(() => import("./components/SearchSynonyms"));
const BreakingBad = lazy(() => import("./components/BreakingBad"));
const ShowProfiles = lazy(() => import("./components/ShowProfiles"));
const Testing = lazy(() => import("./components/Testing"));
const Pokemons = lazy(() => import("./components/Pokemons"));
const GuessColor = lazy(() => import("./components/GuessColor"));
const TrafficLight = lazy(() => import("./components/TrafficLight"));
const Slider = lazy(() => import("./components/Slider"));
const Clock = lazy(() => import("./components/Clock"));
const Form = lazy(() => import("./components/Form"));
const Guack = lazy(() => import("./components/Guack"));
const Table3D = lazy(() => import("./components/Table3D"));
const TicTacToe = lazy(() => import("./components/TicTacToe"));
const ContextAPI = lazy(() => import("./components/ContextAPI"));
const Redux = lazy(() => import("./components/Redux"));

function App() {
  const [colorMode, setColorMode] = useState("dark");

  const lightMode = () => {
    setColorMode("light");
  };

  const darkMode = () => {
    setColorMode("dark");
  };

  return (
    <AppProvider>
      {/* Our redux store will be accessible throughout our entire app */}
      <Provider store = {store}>
        <div className={`App ${colorMode}`}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout lightMode={lightMode} darkMode={darkMode}>
                <Routes>
                  <Route path="/" element={<Admin />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/update-product/:id" element={<UpdateProduct />} />
                  <Route path="/vacations" element={<Vacations />} />
                  {/* <Route path="/trends" element={<TrendsCurrency />} /> */}
                  <Route path="/random-city" element={<RandomCity />} />
                  <Route path="/guess-game" element={<GuessGame />} />
                  <Route path="/search-synonyms" element={<SearchSynonyms />} />
                  <Route path="/pokemons" element={<Pokemons />} />
                  <Route path="/breaking-bad" element={<BreakingBad />} />
                  <Route path="/guess-color" element={<GuessColor />} />
                  <Route path="/traffic-light" element={<TrafficLight />} />
                  <Route path="/slider" element={<Slider />} />
                  <Route path="/testing" element={<Testing />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/clock" element={<Clock />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/guack" element={<Guack />} />
                  <Route path="/showProfiles" element={<ShowProfiles />} />
                  <Route path="/table3D" element={<Table3D />} />
                  <Route path="/tictactoe" element={<TicTacToe />} />
                  <Route path="/contextapi" element={<ContextAPI />} />
                  <Route path="/redux" element={<Redux />} />
                </Routes>
              </Layout>
            </Suspense>
          </BrowserRouter>
        </div>
      </Provider>
    </AppProvider>
  );
}

export default App;
