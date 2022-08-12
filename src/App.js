import SelectTag from "components/form/SelectTag";

function App() {
  const options = [
    { label: "Huey", value: "huey" },
    { label: "Louie", value: "louie" },
    { label: "Dewey", value: "dewey" },
  ];
  return (
    <div className="App py-24 h-screen bg-green-300 flex items-start justify-center">
      <div className="w-96">
        <SelectTag options={options} />
      </div>
    </div>
  );
}

export default App;
