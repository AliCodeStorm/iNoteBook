import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import AuthContext from "../context/AuthContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = ({ showAlert }) => {
  const { notes, getNotes, editNote, loading } = useContext(NoteContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const ref = useRef(null);
  const closeRef = useRef(null);

  // Get all unique tags from notes
  const uniqueTags = [...new Set(notes.map(note => note.tag))].filter(tag => tag);

  // Add "General" to tags if it doesn't exist
  if (!uniqueTags.includes("General") && notes.some(note => !note.tag)) {
    uniqueTags.push("General");
  }

  useEffect(() => {
    if (isAuthenticated) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const updateNote = (note) => {
    ref.current.click();
    setCurrentNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag || "General",
    });
  };

  const handleClick = (e) => {
    editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag);
    closeRef.current.click();
    showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  // Filter notes based on search term and filter tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === "" || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag === "" || note.tag === filterTag || 
      (filterTag === "General" && !note.tag);
    
    return matchesSearch && matchesTag;
  });

  // Sort notes based on sortBy value
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Filter and Search Section */}
      <div className="container mb-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search notes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  <option value="">All Tags</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Note Modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Edit Note
      </button>

      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editNoteModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={currentNote.etitle}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={currentNote.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                    rows={5}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <select
                    className="form-select"
                    id="etag"
                    name="etag"
                    value={currentNote.etag}
                    onChange={onChange}
                  >
                    <option value="General">General</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Study">Study</option>
                    <option value="Important">Important</option>
                    <option value="Health">Health</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  currentNote.etitle.length < 3 ||
                  currentNote.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="card shadow">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0">Your Notes</h2>
            <span className="badge bg-primary rounded-pill">
              {sortedNotes.length} {sortedNotes.length === 1 ? "Note" : "Notes"}
            </span>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading your notes...</p>
              </div>
            ) : sortedNotes.length === 0 ? (
              <div className="text-center my-5">
                {searchTerm || filterTag ? (
                  <div>
                    <i className="fas fa-search fa-3x mb-3 text-muted"></i>
                    <p>No notes match your search.</p>
                    <button 
                      className="btn btn-outline-secondary mt-2"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterTag("");
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div>
                    <i className="fas fa-sticky-note fa-3x mb-3 text-muted"></i>
                    <p>You don't have any notes yet.</p>
                    <p className="text-muted">Create your first note using the form above!</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="row">
                {sortedNotes.map((note) => (
                  <NoteItem
                    key={note._id}
                    updateNote={updateNote}
                    showAlert={showAlert}
                    note={note}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes; 