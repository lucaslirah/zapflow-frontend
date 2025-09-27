// src/components/TrelloConfigForm.jsx
import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

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
    // --- VALIDAÇÃO NO FRONTEND ---
    // Verifica se algum campo está vazio.
    for (const field in form) {
      if (!form[field]) {
        toast.error(`O campo "${field}" é obrigatório.`);
        return; // Interrompe o envio se um campo estiver vazio.
      }
    }

    try {
      const res = await api.post("/config/trello", form);
      // Exibe a notificação de sucesso!
      toast.success("Configuração salva com sucesso!");

      if (onCreated) {
        onCreated(res.data);
      }

      setForm({ name: "", key: "", token: "", boardId: "", listId: "" });
    } catch (err) {
      // --- EXIBIÇÃO DO ERRO DO BACKEND ---
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        // Erro genérico para problemas de rede, etc.
        toast.error("Não foi possível salvar a configuração. Tente novamente.");
      }
      console.error("Erro ao salvar configuração:", err);
    }
  };
  return (
    <form className="form-config animate-in" onSubmit={handleSubmit}>
      {Object.keys(form).map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="form-input"
        />
      ))}
      <button type="submit" className="form-button animate-in animate-delay-4">
        Salvar Configuração
      </button>
    </form>
  );
}
