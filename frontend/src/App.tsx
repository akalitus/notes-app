import React, { useEffect } from "react";
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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");

        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, [])

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      )

      const newNote = await response.json();
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      )

      const updatedNote = await response.json();
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );

      setNotes(updatedNotes);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (
    event: React.MouseEvent | React.TouchEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      )

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
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
