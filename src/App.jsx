import TrelloConfigForm from "./components/TrelloConfigForm";
// import TrelloConfigList from "./components/TrelloConfigList";
// import WhatsAppSessionStarter from "./components/WhatsAppSessioStarter";
import SessionController from "./components/SessionController";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <h1>ZapFlow Dashboard</h1>
      <TrelloConfigForm onCreated={() => {}} />
      {/* <TrelloConfigList /> */}
      {/* <WhatsAppSessionStarter /> */}
      <SessionController />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;