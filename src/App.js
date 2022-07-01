import "./App.css";
// import { useState } from "react";
import Tabs from "./Tabs";
import Island from "./Island";
import PopUp from "./PopUp";
// Icons
// import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";

function App() {
  return (
    <div className="App p-4 h-screen bg-green-300 flex items-start justify-center">
      <Tabs
        tabs={["Apple", "Pearl", "Java"]}
        size="sm"
        horizontal
        palette="primary"
        getSelected={(t) => {
          console.log(t);
        }}
      />
      <Island
        title="Your text"
        head="Head"
        description="An easy description"
        mode="pending"
        percent={50}
      >
        {/* {{ */}
        {/*   icon: <ErrorIcon className="w-8 ml-6 mb-4" />, */}
        {/*   params: [ */}
        {/*     { text: "Params", icon: <ErrorIcon className="w-6" /> }, */}
        {/*     { text: "Params", icon: <ErrorIcon className="w-6" /> }, */}
        {/*   ], */}
        {/* }} */}
      </Island>
      <PopUp mode="pending" />
      <PopUp
        title="File Deleted"
        description="That's all :)"
        buttons={[
          {
            text: "Okay, thank you",
            click() {
              console.log("hello world");
            },
          },
        ]}
      />
      <PopUp
        mode="info"
        title="Do you want delete?"
        description="You can't restore this file"
        buttons={[{ text: "Delete" }, { text: "Cancel" }]}
      />
      <PopUp
        mode="error"
        title="Error"
        description="Sorry"
        buttons={[{ text: "Close" }]}
      />
    </div>
  );
}

export default App;
