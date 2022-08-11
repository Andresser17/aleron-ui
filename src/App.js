import "./App.css";
import Radio from "./Radio";
// Icons

function App() {
  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <div className="w-96">
        <Radio name="drone" label="Huey" />
        <Radio name="drone" label="Dewey" />
        <Radio name="drone" label="Louie" />
      </div>
    </div>
  );
}

export default App;
