import "./App.css";
import SelectTag from "./SelectTag";
// Icons

function App() {
  const options = [
    { label: "New York", value: "new-york" },
    { label: "Moscow", value: "moscow" },
    { label: "Madrid", value: "madrid" },
    { label: "Tokyo", value: "tokyo" },
  ];
  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <div className="w-96">
        <SelectTag disabled tagsPalette="success" options={options} placeholder="Search..." />
      </div>
    </div>
  );
}

export default App;
