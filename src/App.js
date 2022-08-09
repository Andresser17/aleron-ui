import "./App.css";
import Search from "./Search";
// Icons

function App() {
  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <div className="w-96">
        <Search placeholder="Search..." />
      </div>
    </div>
  );
}

export default App;
