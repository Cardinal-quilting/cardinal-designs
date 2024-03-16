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

    start_loc() {
        return [this.props.start_point.x*this.props.project_width, 
                this.props.start_point.y*this.props.project_height]
    }

    end_loc() {
        return [this.props.end_point.x*this.props.project_width, 
            this.props.end_point.y*this.props.project_height]
    }
  
    draw() {
        const [x1pos, y1pos] = this.start_loc();
        const [x2pos, y2pos] = this.end_loc();

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const transform = 0.5*this.props.thickness;

        ctx.beginPath();
        ctx.moveTo(x1pos+transform, y1pos+transform);
        ctx.lineTo(x2pos+transform, y2pos+transform);
        ctx.strokeStyle = this.props.color;
        ctx.lineWidth = this.props.thickness;
        ctx.stroke();
    }

    project_to_line(x, y) {
        const x1pos = this.props.start_point.x, y1pos = this.props.start_point.y,
              x2pos = this.props.end_point.x, y2pos = this.props.end_point.y;

        // compute the distance to the line
        const xdiff = x2pos - x1pos, ydiff = y2pos - y1pos;
        const nrm2 = ydiff*ydiff + xdiff*xdiff;
        const distance = Math.abs(ydiff*x - xdiff*y + x2pos*y1pos - y2pos*x1pos)/Math.sqrt(nrm2);

        // did the user click the line
        const on_line = distance<0.5*this.props.thickness/Math.min(this.props.project_height, this.props.project_width)

        // calculate the dot product of the vector (x1pos, y1pos)->(x, y) and the direction vector
        var dot = ((x-x1pos)*xdiff + (y-y1pos)*ydiff) / nrm2;

        // clamp the dot product to the range [0, 1] to ensure the projected point lies on the line segment
        dot = Math.max(0.0, Math.min(1.0, dot));

        // calculate the coordinates of the projected point
        var projx = x1pos + dot * xdiff;
        var projy = y1pos + dot * ydiff;

        return {on_line: on_line, distance: distance, point: {x: projx, y: projy}};
    }
  
    render() {
        const transform = -0.5*this.props.thickness;

        return (
            <div
            style={{
                position: "absolute",
                transform: `translate(${transform}px, ${transform}px)`, 
                zIndex: this.props.z_index
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