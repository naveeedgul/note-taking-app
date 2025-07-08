import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/notes",
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setContent("");
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          window.location.href = "/";
          navigate("/");
        }}
      >
        Logout
      </button>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Write a note..."
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {note.content}{" "}
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
