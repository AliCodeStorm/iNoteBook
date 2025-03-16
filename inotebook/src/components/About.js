import React from "react";

const About = () => {
  return (
    <div className="container my-4">
      <h1 className="mb-4">About iNotebook</h1>
      <p className="lead">
        iNotebook is a secure cloud-based note-taking application that allows you to create, edit, and manage your notes from anywhere.
      </p>
      
      <div className="my-4">
        <h2>Features</h2>
        <ul className="list-group list-group-flush my-3">
          <li className="list-group-item">
            <strong>Secure Authentication</strong> - Your notes are protected with user authentication
          </li>
          <li className="list-group-item">
            <strong>Cloud Storage</strong> - Access your notes from any device with internet connection
          </li>
          <li className="list-group-item">
            <strong>Create & Edit</strong> - Create new notes and edit existing ones with ease
          </li>
          <li className="list-group-item">
            <strong>Delete Notes</strong> - Remove notes you no longer need
          </li>
          <li className="list-group-item">
            <strong>Categorize</strong> - Add tags to your notes for better organization
          </li>
        </ul>
      </div>
      
      <div className="my-4">
        <h2>Technology Stack</h2>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                Frontend
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">React.js</li>
                <li className="list-group-item">Context API for state management</li>
                <li className="list-group-item">React Router for navigation</li>
                <li className="list-group-item">Bootstrap for styling</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header bg-success text-white">
                Backend
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Node.js</li>
                <li className="list-group-item">Express.js</li>
                <li className="list-group-item">MongoDB for database</li>
                <li className="list-group-item">JWT for authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-4">
        <h2>How to Use</h2>
        <ol className="list-group list-group-numbered my-3">
          <li className="list-group-item">Sign up for an account</li>
          <li className="list-group-item">Log in with your credentials</li>
          <li className="list-group-item">Create your first note</li>
          <li className="list-group-item">Edit or delete notes as needed</li>
          <li className="list-group-item">Add tags to organize your notes</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
