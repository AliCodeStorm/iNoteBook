import React, { useContext } from "react";
import NoteContext from "../context/NoteContext";
import ThemeContext from "../context/ThemeContext";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(NoteContext);
  const { theme } = useContext(ThemeContext);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note._id);
      showAlert("Note deleted successfully", "success");
    }
  };

  // Function to truncate text if it's too long
  const truncate = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Function to determine card border color based on tag
  const getTagColor = () => {
    const tagColors = {
      "Personal": "#ff6b6b",
      "Work": "#339af0",
      "Study": "#20c997",
      "Important": "#fcc419",
      "Health": "#9775fa",
      "Travel": "#5c7cfa"
    };
    return tagColors[note.tag] || "#adb5bd"; // default color if tag doesn't match
  };

  return (
    <div className="col-md-4 my-3">
      <div 
        className="card h-100 shadow-sm" 
        style={{ 
          borderLeft: `4px solid ${getTagColor()}`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff"
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{note.title}</h5>
            <div className="note-actions">
              <button 
                className="btn btn-sm btn-link text-primary border-0 p-1" 
                onClick={() => updateNote(note)}
                title="Edit note"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn btn-sm btn-link text-danger border-0 p-1" 
                onClick={handleDelete}
                title="Delete note"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          
          <p className="card-text">{truncate(note.description, 100)}</p>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            {note.tag && (
              <span className="badge rounded-pill" style={{ backgroundColor: getTagColor() }}>
                {note.tag}
              </span>
            )}
            <small className="text-muted">
              {new Date(note.date).toLocaleString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem; 