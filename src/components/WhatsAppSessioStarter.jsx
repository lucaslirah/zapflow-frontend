// src/components/WhatsAppSessionStarter.jsx
import React, { useState } from "react";
import api from "../services/api";

export default function WhatsAppSessionStarter() {
  const [sessionId, setSessionId] = useState("");
  const [configName, setConfigName] = useState("");

  const handleStart = async () => {
    // pequnena validação
    if (!sessionId || !configName) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    try {
      await api.post("/sessions/start", {
        sessionId,
        trelloConfigName: configName,
      });
      console.log("Sessão iniciada com sucesso");
      alert("Sessão iniciada!");
    } catch (err) {
      console.error("Erro ao iniciar sessão:", err);
    }
  };

  return (
    <div>
      <input
        placeholder="Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <input
        placeholder="Nome da Configuração Trello"
        value={configName}
        onChange={(e) => setConfigName(e.target.value)}
      />
      <button onClick={handleStart}>Iniciar Sessão</button>
    </div>
  );
}