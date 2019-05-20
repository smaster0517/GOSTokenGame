import React, { Component } from "react";
import Canvas from "./Canvas";

export default class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState = () => {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas angle={this.state.angle} />;
  }
}
