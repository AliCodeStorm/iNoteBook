import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [loading, setLoading] = useState(false);

  // Predefined tags for users to choose from
  const predefinedTags = ["Personal", "Work", "Study", "Important", "Health", "Travel", "General"];

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addNote(note.title, note.description, note.tag || "General");
      setNote({ title: "", description: "", tag: "" });
      showAlert("Note added successfully", "success");
    } catch (error) {
      showAlert("Failed to add note", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header">
          <h2 className="h4 mb-0">Create a New Note</h2>
        </div>
        <div className="card-body">
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={note.title}
                onChange={onChange}
                minLength={3}
                required
                placeholder="Enter title (min 3 characters)"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={note.description}
                onChange={onChange}
                minLength={5}
                required
                rows={5}
                placeholder="Enter description (min 5 characters)"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <select
                className="form-select"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              >
                <option value="">Select a tag (optional)</option>
                {predefinedTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                disabled={
                  note.title.length < 3 ||
                  note.description.length < 5 ||
                  loading
                }
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding Note...
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-plus me-2"></i>
                    Add Note
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote; 