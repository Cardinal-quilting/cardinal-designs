import { Component } from "react";

class RecursivePiecingNode extends Component {
    render() {
        const size = String(this.props.size) + "px"

        return (
            <div
                style={{
                    borderRadius: "100%",
                    width: size, 
                    height: size,
                    backgroundColor: this.props.color,
                    position: "absolute",
                    transform: `translate(${this.props.x*this.props.project_width-this.props.size/2}px, 
                            ${this.props.y*this.props.project_height-this.props.size/2}px)`,                
                }}
            />
        );
    }
}

export default RecursivePiecingNode;