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

  const handleSubmit = (event: React.FormEvent) => {
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

  return (
    <div className="app-container">
      <form onSubmit={(event) => handleSubmit(event)} className="note-form">
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

        <button type="submit">Add Note</button>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button>x</button>
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
