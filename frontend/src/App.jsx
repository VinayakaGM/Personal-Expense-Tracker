import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Expenses from "./components/Expenses/Expenses";
import Summary from "./components/Summary/Summary";
import './App.css'
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/expenses" element={<Expenses />}/>
          <Route path="/summary" element={<Summary />}/>
      </Routes>
    </Router>
  );
};

export default App;
