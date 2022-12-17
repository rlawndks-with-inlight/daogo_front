import React from 'react';

class CircleCanvas extends React.Component {
  componentDidMount() {
    // Get a reference to the canvas element
    const canvas = this.refs.canvas;

    // Get a reference to the canvas context
    const ctx = canvas.getContext('2d');

    // Set the canvas dimensions to 500px by 500px
    canvas.width = 500;
    canvas.height = 500;

    // Set the fill color to tomato
    ctx.fillStyle = 'tomato';

    // Begin a new path
    ctx.beginPath();

    // Draw a circle with a radius of 50px, centered at (250, 250)
    ctx.arc(250, 250, 50, 0, 2 * Math.PI);

    // Fill the circle with the tomato color
    ctx.fill();
  }

  render() {
    return <canvas ref="canvas" />;
  }
}

export default CircleCanvas;