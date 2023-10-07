import React from "react";
import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotes);
    setTitle("");
    setContent("");
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (
    event: React.MouseEvent | React.TouchEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form
        onSubmit={(event) =>
          selectedNote ? updateNote(event) : addNote(event)
        }
        className="note-form"
      >
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="title"
          type="text"
          required
        />

        <textarea
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button
              className="button button_type_cancel"
              onClick={handleCancel}
            >
              Cansel
            </button>
            <button className="button button_type_submit" type="submit">
              Save
            </button>
          </div>
        ) : (
          <button className="button button_type_submit" type="submit">
            Add Note
          </button>
        )}
      </form>

      <div className="notes-grid">
        {notes.length ? (
          notes.map((note) => (
            <div
              onClick={() => handleNoteClick(note)}
              key={note.id}
              className="note-item"
            >
              <div className="notes-header">
                <button
                  onClick={(event) => deleteNote(event, note.id)}
                  className="button button_type_delete"
                >
                  x
                </button>
              </div>

              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))
        ) : (
          <p className="notes-grid__empty">No Notes Here Yet</p>
        )}
      </div>
    </div>
  );
};

export default App;
