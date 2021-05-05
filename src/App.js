import { useState } from "react";
import ChipsInput from "./components/ChipsInput/ChipsInput";

function App() {
  const [value, setValue] = useState('это первый чипс, это "второй," чипс');
  return (
    <div className="App">
      <h4>Пример использования готового компонента</h4>
      <div>
        <ChipsInput value={value} onChange={setValue} />
      </div>
      <div>Строковое представление: {value}</div>
    </div>
  );
}

export default App;
