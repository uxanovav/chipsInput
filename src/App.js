import { useState } from "react";
import ChipsInput from "./components/ChipsInput/ChipsInput";

function App() {
  const [value, setValue] = useState("1,2,3,4,5");
  debugger;
  return (
    <div className="App">
      <ChipsInput value={value} onChange={setValue} />
    </div>
  );
}

export default App;
