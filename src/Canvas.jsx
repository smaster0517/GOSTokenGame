import React, { Component } from "react";
import PureCanvas from "./components/Purecanvas";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }

  saveContext(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  componentDidUpdate() {
    const { angle } = this.props;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    //this.ctx.translate(this.width / 2, this.height / 2);
    //this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.restore();
  }

  render() {
    return (
      <PureCanvas widht="300" height="300" contextRef={this.saveContext} />
    );
  }
}
