import React, { useEffect } from "react";
import { useState } from "react";
import fetchData from "./data/fetchData";
import "./App.css";
import { Note } from "./data/types";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { baseUrl, notesRoute } = fetchData;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${baseUrl}${notesRoute}`);

        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, [baseUrl, notesRoute])

  const resetForm = () => {
    setTitle("");
    setContent("");
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCancel = () => {
    resetForm();
    setSelectedNote(null);
  };

  const addNote = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${baseUrl}${notesRoute}`,
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
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}${notesRoute}${selectedNote.id}`,
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
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (
    event: React.MouseEvent | React.TouchEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    try {
      await fetch(
        `${baseUrl}${notesRoute}${noteId}`,
        {
          method: "DELETE",
        }
      )

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
      handleCancel();
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

      <ul className="notes">
        {notes.length ? (
          notes.map((note) => (
            <li
              onClick={() => handleNoteClick(note)}
              key={note.id}
              className="notes__item"
            >
              <div className="notes__item-head">
                <button
                  onClick={(event) => deleteNote(event, note.id)}
                  className="button button_type_delete"
                >
                  x
                </button>
              </div>

              <h2>{note.title}{" "}{note.id}</h2>
              <p>{note.content}</p>
            </li>
          ))
        ) : (
          <p className="notes__empty">No Notes Here Yet</p>
        )}
      </ul>
    </div>
  );
};

export default App;
