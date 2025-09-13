import TrelloConfigForm from "./components/TrelloConfigForm";
// import TrelloConfigList from "./components/TrelloConfigList";
import WhatsAppSessionStarter from "./components/WhatsAppSessioStarter";
import SessionStatus from "./components/SessionStatus";

function App() {
  return (
    <div>
      <h1>ZapFlow Dashboard</h1>
      <TrelloConfigForm onCreated={() => {}} />
      {/* <TrelloConfigList /> */}
      <WhatsAppSessionStarter />
      <SessionStatus />
    </div>
  );
}

export default App;