import "./App.css";
import Home from "./views/Home/Home";
import LoginView from "./views/Login/Login";
import RegisterView from "./views/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsViews from "./views/AboutUs/AboutUs";
import FAQview from "./views/FAQ/FAQ";
import ChatView from "./views/Chat/Chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/aboutus" element={<AboutUsViews />} />
          <Route path="/faq" element={<FAQview />} />
          <Route path="/chat" element={<ChatView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
