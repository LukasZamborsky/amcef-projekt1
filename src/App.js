import React from "react";
import Transactions from "./transaction"; 
import "./App.css"; 

function App() {
  return (
    <div className="App">
      <h1>Transaction Viewer</h1>
      <Transactions /> {/* Používame komponent pre transakcie */}
    </div>
  );
}

export default App;
