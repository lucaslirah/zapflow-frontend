import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaPlay, FaSyncAlt, FaSearch, FaStop } from "react-icons/fa";
import "./SessionController.css";
import TrelloConfigSearch from "./TrelloConfigSearch";
// import { QRCodeCanvas } from "qrcode.react";

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

  // //parar sessão
  // const stopSession = async () => {
  //   if (!sessionId) {
  //     toast.warn("Informe o Session ID para parar.");
  //     return;
  //   }

  //   try {
  //     await api.post(`/sessions/stop/${sessionId}`);
  //     toast.success("Sessão parada com sucesso!");
  //     setStatus("disconnected");
  //     setQr(null);
  //     setPolling(false); // para verificação automática
  //   } catch (err) {
  //     console.error("Erro ao parar sessão:", err);
  //     toast.error("Erro ao parar sessão.");
  //   }
  // };

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
    const ultimaConfig = localStorage.getItem("ultimaConfigTrello");
    const ultimoSession = localStorage.getItem("ultimoSessionId");

    if (ultimaConfig) {
      setConfigName(ultimaConfig);
      toast.info(`Última configuração carregada: ${ultimaConfig}`);
    }

    if (ultimoSession) {
      setSessionId(ultimoSession);
      toast.info(`Último Session ID carregado: ${ultimoSession}`);
    }

    if (polling && status === "starting") {
      const interval = setInterval(() => {
        checkStatus();
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [polling, status]);

  return (
    <div className="session-controller animate-in">
      <TrelloConfigSearch
        onFound={(config) => {
          setConfigName(config.name);
          toast.info(`Usando board: ${config.boardId}`);
        }}
      />
      <input
        className="form-input animate-in animate-delay-1"
        placeholder="Session ID"
        value={sessionId}
        onChange={(e) => {
          const value = e.target.value;
          setSessionId(value);
          localStorage.setItem("ultimoSessionId", value);
        }}
      />
      <input
        className="form-input animate-in animate-delay-2"
        placeholder="Nome da Configuração Trello"
        value={configName}
        onChange={(e) => setConfigName(e.target.value)}
      />

      <div className="button-group">
        <button className="form-button" onClick={resetSession}>
          <FaSyncAlt style={{ marginRight: "6px" }} />
          Resetar Sessão
        </button>
        <button className="form-button" onClick={startSession}>
          <FaPlay style={{ marginRight: "6px" }} />
          Iniciar Sessão
        </button>
        <button className="form-button" onClick={checkStatus}>
          <FaSearch style={{ marginRight: "6px" }} />
          Verificar Status
        </button>
        {/*Se a sessão estiver conectada, exibe o botão de parar*/}
        {/* {status === "connected" && (
          <button onClick={stopSession} style={{ marginLeft: "10px" }}>
            <FaStop style={{ marginRight: "6px" }} />
            Parar Sessão
          </button>
        )} */}
      </div>

      {/* Badge de status */}
      {status && (
        <p className={`status-text badge-${status}`}>
          Status atual: <strong>{status}</strong>
        </p>
      )}

      {qr && (
        <div className="qr-container fade-in">
          <p>Escaneie o QR abaixo para conectar:</p>
          <img src={qr} alt="QR Code" className="qr-image" />
        </div>
      )}
    </div>
  );
}
