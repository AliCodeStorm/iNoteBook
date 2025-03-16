import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ThemeProvider from "./context/ThemeProvider";
import ThemeButton from "./components/ThemeButton";
import NoteState from "./context/NoteState";
import AuthState from "./context/AuthState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <ThemeProvider>
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            {alert && (
              <div className="container mt-3">
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.msg}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
            )}
            <div className="container mt-3">
              <Routes>
                <Route path="/" element={<Home showAlert={showAlert} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login showAlert={showAlert} />} />
                <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                <Route path="/notes" element={
                  <PrivateRoute element={<Notes showAlert={showAlert} />} />
                } />
              </Routes>
            </div>
            <ThemeButton />
          </Router>
        </NoteState>
      </AuthState>
    </ThemeProvider>
  );
}

export default App;
