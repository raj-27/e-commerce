import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Cart } from "./Pages";
import { Navbar } from "./components";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.scss";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
