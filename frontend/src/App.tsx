import React, { useId } from "react";
import { useState } from "react";
import "./App.css";

type Note = {
  id: string;
  title: string;
  content: string;
};

const App = () => {
  const noteId = useId();

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "note title 1",
      content: "note content 1",
    },
    {
      id: "2",
      title: "note title 2",
      content: "note content 2",
    },
    {
      id: "3",
      title: "note title 3",
      content: "note content 3",
    },
    {
      id: "4",
      title: "note title 4",
      content: "note content 4",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: noteId,
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
    noteId: string
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
        {notes.map((note) => (
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
        ))}
      </div>
    </div>
  );
};

export default App;
