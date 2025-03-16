import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = ({ showAlert }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="container my-4">
      <div className="jumbotron p-5 rounded bg-light">
        <h1 className="display-4">Welcome to iNotebook!</h1>
        <p className="lead">
          Your secure notebook on the cloud - Access your notes from anywhere, anytime.
        </p>
        <hr className="my-4" />
        <p>
          iNotebook is a simple and secure way to keep your notes organized.
          Create, update, and delete notes with ease.
        </p>
        {isAuthenticated ? (
          <div>
            <p>Welcome back, {user?.name || "User"}!</p>
            <Link className="btn btn-primary btn-lg" to="/notes" role="button">
              View Your Notes
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <Link className="btn btn-primary btn-lg" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-outline-primary btn-lg" to="/signup" role="button">
              Sign Up
            </Link>
          </div>
        )}
      </div>
      
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Secure Storage</h5>
              <p className="card-text">
                Your notes are securely stored in the cloud with user authentication.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Easy Access</h5>
              <p className="card-text">
                Access your notes from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Organize</h5>
              <p className="card-text">
                Organize your notes with tags for easier management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
