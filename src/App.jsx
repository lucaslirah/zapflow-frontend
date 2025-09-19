import TrelloConfigForm from "./components/TrelloConfigForm";
// import TrelloConfigList from "./components/TrelloConfigList";
import SessionController from "./components/SessionController";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header animate-in">
        <h1>ZapFlow Dashboard ⚡</h1>
        <p>Gerencie suas sessões WhatsApp e configurações do Trello</p>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Configurações Trello</h2>
          <TrelloConfigForm />
          {/* <TrelloConfigList /> */}
        </section>

        <section className="dashboard-section">
          <h2>Sessão WhatsApp</h2>
          <SessionController />
        </section>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
