import "./App.css";
import Home from "./views/Home/Home";
import LoginView from "./views/Login/Login";
import RegisterView from "./views/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
