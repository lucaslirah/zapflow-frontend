// // src/components/TrelloConfigList.jsx
// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function TrelloConfigList() {
//   const [configs, setConfigs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchConfigs = async () => {
//     try {
//       const res = await api.get("/config/trello");
//       setConfigs(res.data);
//     } catch (err) {
//       console.error("Erro ao buscar configurações:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteConfig = async (id) => {
//     if (!window.confirm("Tem certeza que deseja excluir esta configuração?")) return;
//     try {
//       await api.delete(`/config/trello/${id}`);
//       setConfigs(configs.filter((cfg) => cfg.id !== id));
//     } catch (err) {
//       console.error("Erro ao excluir configuração:", err);
//     }
//   };

//   useEffect(() => {
//     fetchConfigs();
//   }, []);

//   if (loading) return <p>Carregando configurações...</p>;
//   if (configs.length === 0) return <p>Nenhuma configuração encontrada.</p>;

//   return (
//     <div>
//       <h3>Configurações Trello Salvas</h3>
//       <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
//         <thead>
//           <tr>
//             <th>Nome</th>
//             <th>Board ID</th>
//             <th>List ID</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {configs.map((cfg) => (
//             <tr key={cfg.id}>
//               <td>{cfg.name}</td>
//               <td>{cfg.boardId}</td>
//               <td>{cfg.listId}</td>
//               <td>
//                 <button onClick={() => deleteConfig(cfg.id)}>Excluir</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }