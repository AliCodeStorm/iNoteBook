import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const host = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if token exists and is valid on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          await getUserDetails();
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Register a user
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        setIsAuthenticated(true);
        await getUserDetails();
        return true;
      } else {
        setError(json.error || "Registration failed");
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        setIsAuthenticated(true);
        await getUserDetails();
        return true;
      } else {
        setError(json.error || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get user details
  const getUserDetails = async () => {
    if (!localStorage.getItem("token")) {
      setUser(null);
      return;
    }
    
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      
      const json = await response.json();
      setUser(json);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Clear auth state if we can't get user details (token might be invalid)
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        getUserDetails,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState; 