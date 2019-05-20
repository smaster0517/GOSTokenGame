import React, { Component } from "react";
import PureCanvas from "../Purecanvas";

export default class Paintings extends Component {
  constructor(props) {
    super();
  }

  saveContext = realCtx => {
    this.props.setContext(realCtx);
    this.width = realCtx.canvas.width;
    this.height = realCtx.canvas.height;
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      ctx,
      coin,
      coinAngle,
      coinX,
      coinY,
      planks,
      hops,
      ratio,
      expectedMoney
    } = this.props;
    if (ctx) {
      ctx.save();
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.translate(coinX, coinY);
      ctx.translate(25, 25);
      ctx.rotate((coinAngle * Math.PI) / 180);
      ctx.drawImage(coin, -25, -25, 50, 50);
      ctx.restore();
      for (let i = 0; i < planks.length; i++) {
        ctx.fillStyle = "rgb(255," + planks[i].color + ",0)";
        ctx.fillRect(planks[i].x, planks[i].y, 75, 30);
        ctx.font = "15px Roboto";
        ctx.fillStyle = "black";
        ctx.fillText(
          "+ " + planks[i].ratio,
          planks[i].x + 15,
          planks[i].y + 20
        );
      }
      ctx.font = "25px Roboto";
      ctx.fillStyle = "#FFE6AB";
      ctx.fillText("Hop: " + hops, 450, 50);
      ctx.fillText("Ratio: " + ratio, 450, 75);
      ctx.fillText(expectedMoney + " bits", 450, 100);
    }
  };

  render() {
    return (
      <div>
        <PureCanvas
          width="600px"
          height="400px"
          contextRef={this.saveContext}
        />
      </div>
    );
  }
}
