import "./App.css";
import Toggle from "./Toggle";
// Icons

function App() {
  const handleChange = (e) => {
    console.log(e.target.name)
  }

  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <Toggle name="accept-hello" onChange={handleChange} />
    </div>
  );
}

export default App;
