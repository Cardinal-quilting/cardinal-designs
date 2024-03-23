import React, { Component } from "react";

class DrawLine extends Component {
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

export default DrawLine;