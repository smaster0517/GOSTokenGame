import React, { Component } from "react";
import "./App.css";
import Paintings from "./components/Paintings";
import coinImg from "../src/images/coin.png";

const coinInitialSpeed = 2;
var coinDelta = -1;
const coin = new Image();
coin.src = coinImg;
const bet = 100;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      coinX: 200,
      coinY: 20,
      coinAngle: 0,
      coinDirection: 1,
      planks: [],
      hops: -2,
      ratio: 0,
      expectedMoney: bet
    };
  }

  setContext = ctx => {
    let _planks = [];
    let _x = 350;
    let _color = 71.5;
    for (let i = 0; i < 5; i++) {
      _x = _x + 100;
      _planks.push({
        x: _x,
        y: ctx.canvas.height - 30,
        color: _color,
        hash: Math.random()
          .toString(36)
          .substring(7),
        ratio: Math.floor(Math.random() * 15) - 5
      });
      _color = _color - 50;
    }
    this.setState({
      ctx: ctx,
      planks: _planks
    });
  };

  componentDidMount = () => {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  };

  updateAnimationState = () => {
    const { coinY, ctx, coinDirection, coinAngle, planks } = this.state;
    const newCoinAngle = coinAngle >= 360 ? 0 : coinAngle + 3;
    coinDelta = coinY < 20 ? 0 : coinDelta + 0.18 * coinDirection;
    if (coinY > ctx.canvas.height - 50 || coinY < 20) {
      const hops = coinY < 20 ? this.state.hops : this.state.hops + 1;
      this.setState(prevState => ({
        coinDirection: -coinDirection,
        coinY:
          coinDirection === 1
            ? prevState.coinY - (coinInitialSpeed + coinDelta)
            : 20,
        coinAngle: newCoinAngle,
        hops: hops
      }));
    } else {
      this.setState(prevState => ({
        coinY:
          -coinDirection === 1
            ? prevState.coinY - (coinInitialSpeed + coinDelta)
            : prevState.coinY + (coinInitialSpeed + coinDelta),
        coinAngle: newCoinAngle
      }));
    }

    for (let i = 0; i < planks.length; i++) {
      const x = planks[i].x;
      if (x <= 193) {
        this.setState(prevState => ({
          ratio: planks[i].ratio <= 0 ? 0 : prevState.ratio + planks[i].ratio,
          expectedMoney:
            planks[i].ratio <= 0
              ? -bet
              : bet * (prevState.ratio + planks[i].ratio)
        }));
        planks.shift();
      } else {
        planks[i].x = planks[i].x - 1;
        planks[i].color = planks[i].color + 0.5;
        if (x === 450) {
          planks.push({
            x: 950,
            y: ctx.canvas.height - 30,
            color: -178.5,
            hash: Math.random()
              .toString(36)
              .substring(7),
            ratio: Math.floor(Math.random() * 15) - 5
          });
        }
      }
    }

    this.rAF = requestAnimationFrame(this.updateAnimationState);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return (
      <div className="App">
        <div className="screen">
          <Paintings
            ctx={this.state.ctx}
            coin={coin}
            coinX={this.state.coinX}
            coinY={this.state.coinY}
            coinAngle={this.state.coinAngle}
            setContext={this.setContext}
            planks={this.state.planks}
            hops={this.state.hops < 0 ? 0 : this.state.hops}
            ratio={this.state.ratio}
            expectedMoney={this.state.expectedMoney}
          />
        </div>
      </div>
    );
  }
}

export default App;
