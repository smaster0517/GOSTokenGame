import React from "react";
import coin from "./images/coin.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="screen">
        <div class="x1">
          <div class="cloud" />
        </div>
        <div class="x2">
          <div class="cloud" />
        </div>
        <div class="x3">
          <div class="cloud" />
        </div>
        <div class="x4">
          <div class="cloud" />
        </div>
        <div class="x5">
          <div class="cloud" />
        </div>
        <div className="dashboard">+ 3243500 Bits<br/>132 Hops</div>
        
        <div className="ballBox">
          <img src={coin} alt="coin" className="ball" />
        </div>
        <div className="mainBox">
          <div className="currentPlate">
            <div className="plateText">+1000 Bits!</div>
          </div>
          <div className="nextPlate">
            <div className="plateText">x 10</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
