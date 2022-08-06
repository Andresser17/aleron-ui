import "./App.css";
import Tooltip from "./Tooltip";
// Icons

function App() {
  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <Tooltip text="Tooltip text" position="bottom">
        <div className="inline-block p-2">Hello World</div>
      </Tooltip>
    </div>
  );
}

export default App;
