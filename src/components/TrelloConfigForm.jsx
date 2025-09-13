// src/components/TrelloConfigForm.jsx
import React, { useState } from "react";
import api from "../services/api";

export default function TrelloConfigForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    key: "",
    token: "",
    boardId: "",
    listId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/trello", form);
      onCreated(res.data);
      setForm({ name: "", key: "", token: "", boardId: "", listId: "" });
    } catch (err) {
      console.error("Erro ao criar configuração:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
        />
      ))}
      <button type="submit">Salvar Configuração</button>
    </form>
  );
}