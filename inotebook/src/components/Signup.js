import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { register, loading, error, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/notes");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Field validation
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword) {
      showAlert("Please fill in all fields", "warning");
      return;
    }
    
    if (credentials.password !== credentials.cpassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }
    
    if (credentials.password.length < 5) {
      showAlert("Password must be at least 5 characters", "danger");
      return;
    }
    
    const success = await register(
      credentials.name,
      credentials.email,
      credentials.password
    );
    
    if (success) {
      showAlert("Account created successfully", "success");
      navigate("/notes");
    } else {
      showAlert(error || "Registration failed", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Create an Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                    minLength={3}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    minLength={5}
                    required
                    placeholder="Create a password (min 5 characters)"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    value={credentials.cpassword}
                    onChange={onChange}
                    minLength={5}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <a href="/login">Login</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 