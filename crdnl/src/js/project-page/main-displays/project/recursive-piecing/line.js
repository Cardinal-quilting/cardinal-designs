import React, { Component } from "react";

class RecursivePiecingLine extends Component {
    constructor(props) {
      super(props);

      this.canvasRef = React.createRef();
    }
  
    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }
  
    draw() {
        const x1pos = this.props.start_point.x*this.props.project_width
        const y1pos = this.props.start_point.y*this.props.project_height

        const x2pos = this.props.end_point.x*this.props.project_width
        const y2pos = this.props.end_point.y*this.props.project_height

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");

        const transform = 0.5*this.props.thickness;

        ctx.beginPath();
        ctx.moveTo(x1pos+transform, y1pos+transform);
        ctx.lineTo(x2pos+transform, y2pos+transform);
        ctx.strokeStyle = this.props.color;
        ctx.lineWidth = this.props.thickness;
        ctx.stroke();
    }
  
    render() {
        const transform = -0.5*this.props.thickness;

        return (
            <div
            style={{
                position: "absolute",
                transform: `translate(${transform}px, ${transform}px)`
            }}
            >
            <canvas 
            ref={this.canvasRef} 
            width={this.props.project_width + this.props.thickness} 
            height={this.props.project_height + this.props.thickness} 
            />
            </div>
        );
    }
  }

export default RecursivePiecingLine;