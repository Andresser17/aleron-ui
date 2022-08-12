import "./App.css";
import Radio from "./Radio";
// Icons

function App() {
  const options = [
    { label: "Huey", value: "huey", selected: true },
    { label: "Louie", value: "louie" },
    { label: "Dewey", value: "dewey" },
  ];
  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <div className="w-96">
        <Radio name="drone" options={options} disabled />
      </div>
    </div>
  );
}

export default App;
