import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

export default function SessionController() {
  const [sessionId, setSessionId] = useState("");
  const [configName, setConfigName] = useState("");
  const [status, setStatus] = useState(null);
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);

  const resetSession = async () => {
    if (!sessionId) {
      toast.warn("Informe o Session ID para resetar.");
      return;
    }

    try {
      await api.post(`/sessions/reset/${sessionId}`);
      toast.success("Sessão resetada com sucesso!");
      setStatus("disconnected");
      setQr(null);
    } catch (err) {
      console.error("Erro ao resetar sessão:", err);
      toast.error("Erro ao resetar sessão.");
    }
  };

  const startSession = async () => {
    if (!sessionId || !configName) {
      toast.warn("Preencha todos os campos.");
      return;
    }

    try {
      const statusRes = await api.get(`/sessions/status/${sessionId}`);
      const currentStatus = statusRes.data.status;

      if (currentStatus === "connected") {
        toast.info("Sessão já está conectada.");
        return;
      }

      if (currentStatus === "starting") {
        toast.info("Sessão já está em inicialização.");
        return;
      }

      await api.post("/sessions/start", {
        sessionId,
        trelloConfigName: configName,
      });

      toast.success("Inicialização da sessão iniciada!");
      setStatus("starting");
      setPolling(true); // ativa verificação automática
    } catch (err) {
      console.error("Erro ao iniciar sessão:", err);
      toast.error("Erro ao iniciar sessão.");
    }
  };

  const checkStatus = async () => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const res = await api.get(`/sessions/status/${sessionId}`);
      const currentStatus = res.data.status;
      setStatus(currentStatus);

      if (currentStatus === "starting") {
        try {
          const qrRes = await api.get(`/sessions/qr/${sessionId}`);
          setQr(qrRes.data.qr);
        } catch {
          setQr(null);
        }
      } else {
        setQr(null);
        if (currentStatus === "connected") {
          toast.success("Sessão conectada!");
        }
      }
    } catch (err) {
      console.error("Erro ao verificar status:", err);
      setStatus("erro");
      setQr(null);
    } finally {
      setLoading(false);
    }
  };

  // Verificação automática do status enquanto estiver "starting"
  useEffect(() => {
    if (polling && status === "starting") {
      const interval = setInterval(() => {
        checkStatus();
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [polling, status]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Controle de Sessão WhatsApp</h3>
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
      <div style={{ marginTop: "10px" }}>
        <button onClick={resetSession}>Resetar Sessão</button>
        <button onClick={startSession} style={{ marginLeft: "10px" }}>
          Iniciar Sessão
        </button>
        <button onClick={checkStatus} style={{ marginLeft: "10px" }}>
          Verificar Status
        </button>
      </div>

      {status && (
        <p style={{ marginTop: "10px" }}>
          Status atual: <strong>{status}</strong>
        </p>
      )}

      {qr && (
        <div style={{ marginTop: "20px" }}>
          <p>Escaneie o QR abaixo para conectar:</p>
          <QRCodeCanvas value={qr} size={200} />
        </div>
      )}
    </div>
  );
}
