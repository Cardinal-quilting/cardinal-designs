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
        const nrm = Math.sqrt(ydiff*ydiff + xdiff*xdiff);
        const distance = Math.abs(ydiff*x - xdiff*y + x2pos*y1pos - y2pos*x1pos)/nrm;

        // did the user click the line
        const on_line = distance<0.5*this.props.thickness/Math.min(this.props.project_height, this.props.project_width)

        // project onto the line so that it is exactly on the line
        const minx = Math.min(x1pos, x2pos), maxx = Math.max(x1pos, x2pos);
        const projx = Math.max(Math.min(xdiff*xdiff*x/nrm, maxx), minx);
        const miny = Math.min(y1pos, y2pos), maxy = Math.max(y1pos, y2pos);
        const projy = Math.max(Math.min(ydiff*ydiff*y/nrm, maxy), miny);
        
        return {on_line: on_line, distance: distance, point: {x: projx, y: projy}};
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