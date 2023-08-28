import React from "react";
import "./App.css";

import { RenderTemplate } from "./components/RenderTemplate";
import { TestButton } from "./TestButton";

function App() {
  return (
    <div className="App">
      <div>PayPal comercetools client</div>
      <RenderTemplate>
        <TestButton />
      </RenderTemplate>
    </div>
  );
}

export default App;
