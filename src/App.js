import { useState } from "react";
import ChipsInput from "./components/ChipsInput/ChipsInput";

function App() {
  const [value, setValue] = useState();
  debugger;
  return (
    <div className="App">
      <ChipsInput value={value} onChange={setValue} />
    </div>
  );
}

export default App;
