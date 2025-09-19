import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import React, { useState } from "react";
import api from "../services/api";
import "./TrelloConfigSearch.css";

export default function TrelloConfigSearch({ onFound }) {
  const [searchName, setSearchName] = useState("");

  const handleSearch = async () => {
    if (!searchName) return;
    try {
      // buscar configuração pelo nome
      const res = await api.get(`/config/trello/${searchName}`);
      onFound(res.data);
      localStorage.setItem("ultimaConfigTrello", res.data.name);
      toast.success("Configuração encontrada!");
    } catch (err) {
      toast.error("Configuração não encontrada.");
    }
  };

  return (
    <div className="search-config">
      <input
        className="form-input"
        placeholder="Buscar configuração por nome"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button className="form-button" onClick={handleSearch}>
        <FaSearch style={{ marginRight: "6px" }} />
        Buscar
      </button>
    </div>
  );
}
