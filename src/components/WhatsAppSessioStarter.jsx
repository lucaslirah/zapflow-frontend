// import React, { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// export default function WhatsAppSessionStarter() {
//   const [sessionId, setSessionId] = useState("");
//   const [configName, setConfigName] = useState("");

//   const handleStart = async () => {
//     if (!sessionId || !configName) {
//       toast.warn("Por favor, preencha todos os campos.");
//       return;
//     }

//     try {
//       // Verifica o status atual da sessão
//       const statusRes = await api.get(`/sessions/status/${sessionId}`);
//       const currentStatus = statusRes.data.status;

//       if (currentStatus === "connected") {
//         toast.info("Sessão já está conectada.");
//         return;
//       }

//       if (currentStatus === "starting") {
//         toast.info("Sessão já está em processo de inicialização.");
//         return;
//       }

//       // Se estiver "disconnected" ou "not_found", pode iniciar
//       await api.post("/sessions/start", {
//         sessionId,
//         trelloConfigName: configName,
//       });

//       toast.success("Inicialização da sessão iniciada!");
//     } catch (err) {
//       console.error("Erro ao iniciar sessão:", err);
//       toast.error("Erro ao iniciar sessão.");
//     }
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h3>Iniciar Sessão WhatsApp</h3>
//       <input
//         placeholder="Session ID"
//         value={sessionId}
//         onChange={(e) => setSessionId(e.target.value)}
//       />
//       <input
//         placeholder="Nome da Configuração Trello"
//         value={configName}
//         onChange={(e) => setConfigName(e.target.value)}
//       />
//       <button onClick={handleStart}>Iniciar Sessão</button>
//     </div>
//   );
// }
