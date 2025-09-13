// src/components/SessionStatus.jsx
import React, { useState } from "react";
import api from "../services/api";
import { QRCodeCanvas } from "qrcode.react";

export default function SessionStatus() {
  const [sessionId, setSessionId] = useState("");
  const [status, setStatus] = useState(null);
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/sessions/status/${sessionId}`);
      setStatus(res.data.status);

      if (res.data.status === "starting" || res.data.status === "disconnected") {
        const qrRes = await api.get(`/sessions/qr/${sessionId}`);
        setQr(qrRes.data.qr);
      } else {
        setQr(null);
      }
    } catch (err) {
      console.error("Erro ao verificar status:", err);
      setStatus("erro");
      setQr(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Status da Sessão WhatsApp</h3>
      <input
        placeholder="Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button onClick={checkStatus} disabled={loading}>
        {loading ? "Verificando..." : "Verificar Status"}
      </button>

      {status && <p>Status atual: <strong>{status}</strong></p>}

      {qr && (
        <div style={{ marginTop: "20px" }}>
          <p>Escaneie o QR abaixo para conectar:</p>
          <QRCodeCanvas value={qr} size={200} />
        </div>
      )}
    </div>
  );
}